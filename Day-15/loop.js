const companies = [
    {id: 1, name: "Tech Corp"},
    {id: 2, name: "Finance Inc"},
    {id: 3, name: "Health Plus"}
];

const employees = [
    {name: "Alice", companyId: 1, salary: 15000000},
    {name: "Bob", companyId: 1, salary: 18000000},
    {name: "Charlie", companyId: 2, salary: 22000000},
    {name: "David", companyId: 2, salary: 20000000},
    {name: "Eve", companyId: 3, salary: 25000000}
];

/*
                                                                ┌──────────────────────────────────────┐
                                                                │            {                         │
                               ┌────────────────────┐           │                                      │
                               │            {       │           │               name:  company.name    │
                               │              id:   │           │                                      │
                               │ companies          │  map      │companyList    employees: ◄───────────┼────────┐
                               │                    ├──────────►│                                      │        │
                               │              name: │ company   │                                      │        │
                               │            }       │           │               averageSalary: ◄───────┼────────┼──────────────────────────────────┐
                               └────────────────────┘           │                                      │        │                                  │
                                                                │            }                         │        │                                  │
                                                                └──────────────────────────────────────┘        │                                  │
                                                                                                                │                                  │
                                                                                                                │                                  │
                                                                                                                │                                  │
                                                                                                                │                                  │
                             function employeesOfCompany(companyId)                                             │                                  │
                                                                                                                │                                  │
  ┌────────────────────────────┐                                                                                │                                  │
  │              {             │                                                                                │                                  │
  │                            │                                                                                │                                  │
  │                 name:      │                                                                                │                                  │
  │                            │                                                                                │                                  │
  │                            │   filter                                                return array     ┌─────┴─────────┐                        │
  │  employees      companyId: ├───────────────► employee.companyId === companyId ? ───────────────────►  │  employeeList │                        │
  │                            │   employee                                                               └─────┬─────────┘                        │
  │                            │                                                                                │                                  │
  │                 salary:    │                                                                                │                                  │
  │                            │                                                                                ▼                                  │
  │              }             │                                                                function averageSalary(employeeList)               │
  └────────────────────────────┘                                                                                                                   │
                                                                                                                │                                  │
                                                                                                                │                                  │
                                                                                                                ▼                                  │
                                                                                                            declare sum = 0                        │
                                                                                                                                                   │
                                                                                                                │                                  │
                                                                                                                │                   ┌──────────────┴──────────────────────┐
                                                                                                                │                   │                                     │
                                                                                                                ▼                   │                   sum               │
                                                                                                   for each employee  ────────────► │averageSalary = ──────────────────── │
                                                                                                    │                               │                employeeList.length  │
                                                                                                    │    ┌───────────────────────┐  │                                     │
                                                                                                    │    │                       │  └─────────────────────────────────────┘
                                                                                                    └───►│sum += employee.salary │
                                                                                                         └───────────────────────┘
 */

const companyList = companies.map(function (company){
    const employeeList = employeesOfCompany(company.id)
    return {
        "name": company.name,
        "employees": employeeList,
        "averageSalary": averageSalary(employeeList)
    }
});

function employeesOfCompany(companyId){
    return employees.filter(function (employee){
        return employee.companyId === companyId;
    })
}

function averageSalary(employeeList){
    let sum = 0;
    for(let employee of employeeList){
        sum += employee.salary;
    }
    return sum/employeeList.length;
}

console.log(companyList);

