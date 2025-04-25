import {Header, Employee} from "../../utils";
import FTable from "../../components/FTable";

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'age', text: 'Tuoi'},
  {name: 'address', text: 'Dia Chi'},
  {name: 'action', text: ''}
];

export default () => {
  const employees: Employee[] = [
    {id: 1, name: 'Dung', age: 20, address: 'Thanh Oai - Ha Noi'},
    {id: 2, name: 'Trung', age: 22, address: 'Quoc Oai - Ha Noi'},
    {id: 3, name: 'Son', age: 221, address: 'Thanh Oai - Ha Noi'},
    {id: 4, name: 'Anh', age: 25, address: 'Thanh Oai - Ha Noi'},
  ]

  return (
    <>
      <h1>Employee page</h1>
      <FTable tableName="Employees" headers={headers} rows={employees}/>
    </>
  )
}