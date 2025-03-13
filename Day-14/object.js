const companyA = [
    {id: 1, name: "Minh", age: 25},
    {id: 2, name: "An", age: 30},
    {id: 3, name: "Bình", age: 28},
    {id: 4, name: "Dũng", age: 25}
];

const companyB = [
    {id: 5, name: "Bình", age: 32},
    {id: 6, name: "Chi", age: 28},
    {id: 7, name: "An", age: 29},
    {id: 8, name: "Dũng", age: 25}
];

/*
 function createObjectByName(arr)

 initialize obj={}
            │
            │
            │
            ▼
    for each element in arr   ──────────────►  return obj
            │
            │ ┌────────────────────────────────┐
            │ │ set  key = element.name        │
            │ │                                │
            └►│ obj[key] = {                   │
              │              id: element.id,   │
              │                                │
              │              age: element. age │
              │                                │
              │            }                   │
              └────────────────────────────────┘

 */
function createObjectByName(arr){
    const obj = {};
    for(let i=0;i<arr.length;i++){
        let key = arr[i].name;
        obj[key] = {
            id: arr[i].id,
            age: arr[i].age
        }
    }
    return obj;
}

/*

 function findCommonNames(arr1, arr2)


initialize obj1 = createObjectByName(arr1)
                │
                │
                │
                ▼
  for each element in arr2
                │
                │ ┌──────────────────────────────────────────────┐
                │ │  set key = element.name                      │
                │ │           │                                  │
                │ │           │                                  │
                │ │           │                                  │
                └►│           ▼            False                 │
                  │   obj1[key] existed ? ──────────► Do nothing │
                  │                                              │
                  │           │                                  │
                  │           │True                              │
                  │           │                                  │
                  │           ▼                                  │
                  │   Print the result                           │
                  │                                              │
                  └──────────────────────────────────────────────┘
 */
function findCommonNames(arr1, arr2){
    const obj1 = createObjectByName(arr1);

    for(let i=0;i<arr2.length;i++){
        let key = arr2[i].name;
        if(obj1[key] !== undefined){
            console.log(`People with the same name as ${key}:`);
            console.log(`From A: id: ${obj1[key].id}, age: ${obj1[key].age}`);
            console.log(`From B: id: ${arr2[i].id}, age: ${arr2[i].age}`);
        }
    }
}

findCommonNames(companyA, companyB);

console.log("*******************************")

/*
 function createObjectByAgeAndName(arr)

 initialize obj={}
            │
            │
            │
            ▼
    for each element in arr   ──────────────►  return obj
            │
            │ ┌────────────────────────────────────────────┐
            │ │ set  key = element.name_element.age        │
            │ │                                            │
            └►│                                            │
              │ obj[key] =  {                              │
              │                                            │
              │                id: element.id              │
              │             }                              │
              │                                            │
              └────────────────────────────────────────────┘

 */
function createObjectByAgeAndName(arr){
    const obj = {};
    for(let i=0;i<arr.length;i++){
        let key = `${arr[i].name}_${arr[i].age}`;
        obj[key] = {
            id: arr[i].id
        }
    }
    return obj;
}

/*
  function findCommonAgeAndName(arr1,arr2)

 initialize obj1 = createObjectByAgeAndName(arr1)
                 │
                 │
                 │
                 ▼
   for each element in arr2
                 │
                 │ ┌──────────────────────────────────────────────┐
                 │ │  set key = element.name_element.age          │
                 │ │           │                                  │
                 │ │           │                                  │
                 │ │           │                                  │
                 └►│           ▼            False                 │
                   │   obj1[key] existed ? ──────────► Do nothing │
                   │                                              │
                   │           │                                  │
                   │           │True                              │
                   │           │                                  │
                   │           ▼                                  │
                   │   Print the result                           │
                   │                                              │
                   └──────────────────────────────────────────────┘

 */
function findCommonAgesAndName(arr1, arr2){
    const obj1 = createObjectByAgeAndName(arr1);

    for(let i=0;i<arr2.length;i++){
        let key = `${arr2[i].name}_${arr2[i].age}`;
        if(obj1[key] !== undefined){
            console.log(`People with the same name as ${arr2[i].name} and same age as ${arr2[i].age}:`);
            console.log(`From A: id: ${obj1[key].id}`);
            console.log(`From B: id: ${arr2[i].id}`);
        }
    }
}

findCommonAgesAndName(companyA,companyB);