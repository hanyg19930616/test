//either函子用来处理异常
//left函子用来处理异常
class Left{
    static of(value){
        return new Left(value)
    }
    constructor(value){
        this._value= value
    }
    map(fn){
        return this
    }
}
//right函子用来处理正常值
class Right{
  static of(value){
      return new Right(value)
  }
  constructor(value){
      this._value=value
  }
  map(fn){
   return Right.of(fn(this._value))
  }
}

function person(json){
  try{
    return Right.of(JSON.parse(json))
  }catch{
      return Left.of({error:e.message})
  }
}
let r=person('{ "name": "zs" }').map(x => x.name.toUpperCase())
console.log(r,'rr')
