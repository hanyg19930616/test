// IO Monad
const fs = require('fs')
const fp = require('lodash/fp')

class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }

  constructor (fn) {
    this._value = fn
  }

  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }

  join () {
    return this._value()
  }

  flatMap (fn) {
    return this.map(fn).join()
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function (x) {
  return new IO(function () {
    console.log(x)
    return x
  })
}

let r = readFile('package.json')
          // .map(x => x.toUpperCase())
          .map(fp.toUpper)
          .flatMap(print)
          .join()
//过程分析  当一个函数返回函子的时候就优先选择monad解决函子嵌套的问题
// 1首先调用readFile读取文件 readFile返回new的一个Io函子，并将函子传入constructor构造函数 
  //2 之后调用flatMap（当值返回函子时则调用flatMap），传入print返回的Io函子，在flatMap函数内调用map传入fn，
   //map将第一次传入readFile返回的函子this._value，与fn（print,返回一个Io函子）合并执行，并将this._value的执行结果返回的函子传入给了fn（print）,
  //之后将结果打印出来 因为返回的是一个函子所以调用join将结果展开
console.log(r)