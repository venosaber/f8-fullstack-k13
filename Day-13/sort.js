/*

   declare arr, n = arr.length
          │
          │
          │
          │
          ▼            true
        n <= 1 ?  ────────────────►  do nothing
          │
          │false
          │
          │
          ▼
  for i= 1 -> n-1
          │
          │
          │
          │  ┌──────────────────────────────────────────────────────────┐
          │  │        declare tmp = x[i], j = i-1                       │
          │  │                 │                                        │
          │  │                 │                                        │
          │  │                 │                                        │
          └─►│                 ▼               false                    │
             │    ┌──► j >=0 && x[j] > tmp ? ───────────► x[j+1] = tmp  │
             │    │                                                     │
             │    │            │                                        │
             │    │            │true                                    │
             │    │            │                                        │
             │    │            ▼                                        │
             │    │     ┌───────────────┐                               │
             │    │     │ x[j+1] = x[j] │                               │
             │    └─────┤               │                               │
             │          │ j = j-1       │                               │
             │          └───────────────┘                               │
             └──────────────────────────────────────────────────────────┘

 */

function sortArray(x){
    var n = x.length;
    for(var i=1;i<n;i++){
        var tmp = x[i], j = i-1;
        while(j>=0 && x[j]>tmp){
            x[j+1] = x[j];
            j--;
        }
        x[j+1] = tmp;
    }
}

var arr = [2, 3, 4, 1, 0, 8, 5];
console.log(`The original array is: ${arr}`);
sortArray(arr);
console.log(`The sorted array is: ${arr}`);