//使用maybe函子解决null和undifined的问题 //存在的问题当出现null的时候不知道那个位置出现

class Maybe{
    static of(value){
        return new Maybe(value)
    }
    constructor(value){
     this._value=value
    }
    map(fn){
        return this.isNothing() ? Maybe.of(null):Maybe.of(fn(this._value))
    }
    isNothing(){
        return this._value === undefined || this._value === null
    } 
}
// let r=Maybe.of(5).map(x=>x+5)
// console.log(r,"r")

// let r=Maybe.of('hello world').map(x=>x.toUpperCase())
let r=Maybe.of('hello world').map(x=>x.toUpperCase())
                             .map(x=>x=null)
                             .map(x=>x.split())
console.log(r,"r")