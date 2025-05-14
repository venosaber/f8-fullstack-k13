import {useLocation, useParams} from "react-router";
import {FEditTable} from "../../components";

const columns = [
  {name: "id", text: "ID"},
  {name: "name", text: "Name"},
  {name: "age", text: "Age"},
  {name: "address", text: "Address"},
  {name: "salary", text: "Salary"},
  {name: "position", text: "Position"},
  {name: "status", text: "Status"}
]
const rows =   [
  {
    "id": 1,
    "name": "Employee 1",
    "age": 43,
    "address": "Address 1",
    "salary": 3653,
    "position": "Director",
    "status": "Active"
  },
  {
    "id": 2,
    "name": "Employee 2",
    "age": 25,
    "address": "Address 2",
    "salary": 3582,
    "position": "Warehouse",
    "status": "Inactive"
  },
  {
    "id": 3,
    "name": "Employee 3",
    "age": 31,
    "address": "Address 3",
    "salary": 7824,
    "position": "Accountant",
    "status": "Inactive"
  },
  {
    "id": 4,
    "name": "Employee 4",
    "age": 25,
    "address": "Address 4",
    "salary": 6134,
    "position": "Warehouse",
    "status": "Active"
  },
  {
    "id": 5,
    "name": "Employee 5",
    "age": 33,
    "address": "Address 5",
    "salary": 3097,
    "position": "Accountant",
    "status": "Active"
  },
]

export default function () {
  console.log(useParams())
  const location = useLocation()

  console.log(location)
  return (
    <>
      <FEditTable columns={columns} rows={rows} />
    </>
  )
}