/*

      var n
        │
        │
        ▼      false
      n >=0?────────────► not a square
        │
        │
        │
        ▼
    var a = n**0.5
         │
         │
         │
         ▼          false
     a % 1 === 0 ? ──────►  not a square
         │
         │true
         │
         ▼
     n is a square

 */

function isSquare(n){
    if(n<0){
        return false;
    }else{
        var a = n**0.5;
        if(a%1 === 0){
            return true;
        }
        return false;
    }
}
var a = 30;
if(isSquare(a)){
    console.log(a," is a square");
}else{
    console.log(a," is not a square");
}