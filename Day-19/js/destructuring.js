const user = { firstName: "Nguyễn", lastName: "Văn A", age: 25 };

console.log(getFullName(user));

/*

 user = { firstName: "Nguyễn", lastName: "Văn A", age: 25 }

                             │
                             │ destructuring
                             │
                             ▼

                  { firstName, lastName }  ────────►  "Nguyễn Văn A"

 */

function getFullName(user){
    const {firstName, lastName} = user;
    return `${firstName} ${lastName}`;
}