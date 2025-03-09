/*
           var n
              │
              │
              │
              ▼       true
           n  <= 1 ? ─────────► not prime
              │
              │ false
              ▼
           var i=2
               │
               │
               │
               ▼          false
   ┌─────► i <= n**0.5 ?───────► prime
   │           │
   │           │true
   │           │
   │           ▼          true
   │        n %i === 0 ?───────►not prime
   │            │
   │            │false
   │            │
   │            ▼
   └──────────i = i+1


 */
function isPrime(n){
    if(n<=1){
        return false;
    }else{
        for(var i=2;i<=n**0.5;i++){
            if(n%i === 0){
                return false;
            }
        }
        return true;
    }
}
var a = 17;
if(isPrime(a)){
    console.log(a," is a prime");
}else{
    console.log(a," is not a prime");
}