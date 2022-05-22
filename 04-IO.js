//IO 函子

const fp=require('lodash/fp')
class Io{
    static of(x){
    return new Io(function(){
        return x
    })
    }
    constructor(fn){ //
     this._value=fn
    }
    map(fn){ //传入的是当前的需要对值进行操作的函数
      return new Io(fp.flowRight(fn,this._value))
    }
}

let r= Io.of(process).map(p=>p.execPath)
console.log(r._value(),"r")