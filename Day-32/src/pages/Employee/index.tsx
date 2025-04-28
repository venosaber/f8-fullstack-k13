import {Header, Employee} from "../../utils"
import {useState} from "react";
import {FTable, EmployeeDialog} from "../../components";
import {Button} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const headers: Array<Header> = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'age',text: 'Tuoi'},
  {name: 'address', text: 'Dia chi'},
  {name: 'salary', text: 'Muc luong'},
  {name: 'position', text: 'Chuc vu'},
  {name: 'status', text: 'Trang thai'},
  {name: 'action', text: ''}
];

export default () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [employees, setEmployees] = useState<Array<Employee>>([
    {id: 1, name: 'Havana', age: 25, address: 'Ha Noi', salary: 100000, position: 'Nhan vien', status: 'Dang lam viec'},
  ]);

  // information of the employee that would be shown on the dialog
  const [dialogEmployee, setDialogEmployee] = useState<Employee | undefined>(undefined);
  // check if the dialog is open to add a new employee or to edit an existing employee
  const [isNew, setIsNew] = useState<boolean>(false);

  const onAdd = () => {
    setIsNew(true);
    setDialogEmployee(undefined); // there should be no information on the dialog yet
    setIsDialogOpen(true);
  }

  const onEdit = (employee: Employee) => {
    setIsNew(false);
    setDialogEmployee(employee); // the default information on the dialog is of this employee
    setIsDialogOpen(true);
  }

  const onSave = (employee: Employee, isNew: boolean) => {
    setIsDialogOpen(false);
    if (isNew) { // add a new employee
      const id = employees[employees.length - 1]?.id + 1 || 1; // if employees[] is empty => new id is 1
      const {name, age, address, salary, position, status} = employee;
      const newEmployee = {id, name, age, address, salary, position, status};
      setEmployees(employees => [...employees, newEmployee]);
    } else {  // editing an employee
      setEmployees(currentEmployees => currentEmployees.map(
        currentEmployee => currentEmployee.id === employee.id ? employee : currentEmployee // replace
      ));
    }
  }

  const onDelete = (id: number) => {
    setEmployees(employees => employees.filter(employee => employee.id !== id));
  }

  return (
    <>
      <h1>Employee page</h1>
      <Button variant="outlined" onClick={onAdd}>Add Employee</Button>
      <FTable tableName="Employees" headers={headers} rows={employees} onEdit={onEdit} onDelete={onDelete}/>
      <EmployeeDialog title={isNew ? "Add New Employee" : "Edit Employee Information"}
                      isOpen={isDialogOpen} isNew={isNew}
                      onSave={onSave} onClose={() => setIsDialogOpen(false)}
                      dialogEmployee={dialogEmployee}
                      key={isNew ? Date.now() : dialogEmployee?.id}
        // add a new employee -> key = Date.now() to force remount
        // edit an existing employee -> key = dialogEmployee.id
      />
    </>
  )
}