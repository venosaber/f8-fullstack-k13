/*

             var n
                │
                │
                ▼     false
           n <= 1 ? ───────────► not perfect  ◄───────────────────┐
                                                           false  │
                │true                                             │
                │                                                 │       true
                ▼                        ┌─────────────────► sum === n ? ─────► perfect
           var i = 2                     │                        ▲
           var sum = 1                   │                        │
                │                        │false                   │
                │                        │                        │
                │                        │                        │
                ▼          false         │         true           │
  ┌──────►i <  n ** 0.5 ? ──────► i=== n**0.5 ?  ───────►  sum = sum + i
  │             │
  │             │true
  │             │
  │             ▼       true
  │         n %i=== 0 ? ──────► sum = sum + i + n/i
  │             │                      │
  │             │false                 │
  │             │                      │
  │             ▼                      │
  └─────────i = i+1 ◄──────────────────┘

 */

function isPerfect(n){
    if(n<=1){
        return false;
    }else{
        var i, sum = 1;
        for(i=2; i< n**0.5; i++){
            if(n%i ===0){
                sum = sum +i + n/i;
            }
        }
        if(i === n**0.5){
            sum = sum +i;
        }
        if(sum === n){
            return true;
        }else{
            return false;
        }
    }
}
var a = 12;
if(isPerfect(a)){
    console.log(a," is a perfect number");
}else{
    console.log(a," is not a perfect number");
}