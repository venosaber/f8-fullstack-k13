import {Header, Employee} from "../../utils"
import {useEffect, useState} from "react";
import {FTable, EmployeeDialog} from "../../components";
import {Button} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import api from "../../plugins/api.ts";

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

  const [employees, setEmployees] = useState<Array<Employee>>([]);

  // information of the employee that would be shown on the dialog
  const [dialogEmployee, setDialogEmployee] = useState<Employee | undefined>(undefined);
  // check if the dialog is open to add a new employee or to edit an existing employee
  const [isNew, setIsNew] = useState<boolean>(false);

  const getData = async () => {
    try{
      const employeesData = await api.get('/employees/');
      setEmployees(employeesData.data);
    }catch (e){
      console.error(e);
    }
  }

  const postData = async (employee: Employee) => {
    try{
      const response = await api.post('/employees/', employee);
      return response.data;
    }catch (e){
      throw e;
    }
  }

  const putData = async (employee: Employee) => {
    try{
      const response = await api.put(`/employees/${employee.id}`, employee);
      return response.data;
    }catch (e){
      throw e;
    }
  }

  const deleteData = async (id: string) => {
    try{
      await api.delete(`/employees/${id}`);
    }catch (e){
      throw e;
    }
  }

  // onMounted
  useEffect(() => {
    getData();
  },[]);

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

  const onSave = async (employee: Employee, isNew: boolean) => {
    setIsDialogOpen(false);

    if (isNew) { // add a new employee
      // Optimistic UI update
      const id = String(Number(employees[employees.length - 1]?.id) + 1 || 1); // if employees[] is empty => new id is 1
      const newEmployee = {...employee, id};
      setEmployees(employees => [...employees, newEmployee]);

      // Update to server
      try{
        const addedEmployee = await postData(newEmployee);
        console.log('Employee added successfully: ', addedEmployee);
      }catch (e){ // rollback
        setEmployees(employees => employees.filter(employee => employee.id !== id));
        console.error('Error adding employee: ', e);
      }

    } else {  // editing an employee
      // Optimistic UI update
      const replacedEmployee: Employee = employees.find(em => em.id === employee.id)!;
      setEmployees(employees => employees.map(em => em.id === employee.id ? employee : em));

      // Update to server
      try{
        const updatedEmployee = await putData(employee);
        console.log('Employee updated successfully: ', updatedEmployee);
      }catch (e){ // rollback
        setEmployees(employees => employees.map(em => em.id === employee.id ? replacedEmployee : em)); // rollback
        console.error('Error updating employee: ', e);
      }
    }
  }

  const onDelete = async (id: string) => {
    // Delete - Optimistic UI update
    const deleteIndex: number = employees.findIndex(e => e.id === id);
    const deletedEmployee = employees[deleteIndex];
    const newEmployees = [...employees].filter(e => e.id !== id);
    setEmployees(newEmployees);

    // Update to server
    try{
      await deleteData(id);
      console.log('Employee deleted successfully: ', deletedEmployee);
    }catch (e){ // rollback
      newEmployees.splice(deleteIndex, 0, deletedEmployee);
      setEmployees(newEmployees);
      console.error('Error deleting employee: ', e);
    }
  }

  return (
    <>
      <h1>Employee page</h1>
      <Button variant="outlined" onClick={onAdd}>Add Employee</Button>
      <FTable tableName="Employees hehe" headers={headers} rows={employees} onEdit={onEdit} onDelete={onDelete} width={1400}/>
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