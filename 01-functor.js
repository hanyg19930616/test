//函子
// class Contaier{
//   constructor(value){
//       console.log(value,"valuess")
//       this._value=value
//   }
//   map(fn){
//     return new Contaier(fn(this._value))
//   }
// }

//  let r=  new Contaier(5).map(x=>x+1)
 
//  console.log(r,"rsss")
class Contaier{
  static of(value){
    return new Contaier(value)
  }
  constructor(value){
      console.log(value,"valuess")
      this._value=value
  }
  map(fn){
    console.log("valuess")
    return Contaier.of(fn(this._value))
  }
}
let r= Contaier.of(5).map(x=>x+5).map(x=>x*x)
console.log(r,"rsssss")