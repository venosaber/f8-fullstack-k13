import {FTable, FHeader, CustomerDialog, SearchBar} from '../../components'
import {Customer, Header} from '../../utils'
import {Box} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getCustomers, createCustomer, deleteCustomer, updateCustomer} from '../../store'
import type {RootState, AppDispatch} from '../../store'

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'companyName', text: 'Cong Ty'},
  {name: 'address', text: 'Dia Chi'},
  {name: 'description', text: 'Mo Ta'},
  {name: 'action', text: ''}
]

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curCustomer, setCurCustomer] = useState<Customer>({
    id: 0,
    name: '',
    companyName: '',
    address: '',
    description: ''
  })

  const {data: customers} = useSelector((state: RootState) => state.customers);
  const dispatch: AppDispatch = useDispatch();

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback((id: number) => {
    const currentCustomer: Customer = customers.find((c: Customer) => c.id === id)!;
    setCurCustomer({...currentCustomer})
    setIsOpenDialog(true)
  }, [customers])

  const onSave = async () => {
    setIsOpenDialog(false)

    if (curCustomer.id) {
      const newCustomer = {...toBody(), id: curCustomer.id}
      dispatch(updateCustomer(newCustomer))
    }
    else {
      const newCustomer = {...toBody(), id: 0}
      dispatch(createCustomer(newCustomer))
    }
  }

  const onDelete = useCallback((id: number)=>{
    dispatch(deleteCustomer(id))
  }, [dispatch])

  const toBody = () => {
    return {
      name: curCustomer.name,
      companyName: curCustomer.companyName,
      address: curCustomer.address,
      description: curCustomer.description
    }
  }

  useEffect(()=>{
    dispatch(getCustomers())
  },[dispatch])


  return (
    <>
      <FHeader title={'Customers'}/>
      <Box className={'container'}>
        <SearchBar onAdd={onAdd}/>

        <FTable
          headers={headers}
          rows={customers}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <CustomerDialog
          customer={curCustomer}
          setCustomer={setCurCustomer}
          onSave={onSave}
          isOpen={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
        />
      </Box>
    </>
  )
}