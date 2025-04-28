import {TextField, Stack, Typography, Autocomplete} from "@mui/material";
import {EmployeeDialogProp} from "../../../utils";
import {useState} from "react";
import {DialogContainer} from "../../index.ts"

interface EmployeeFormData{
  id?: number | null;
  name: string;
  age: string;      // not number but string, to be more flexible
  address: string;
  salary: string;
  position: string;
  status: string;
}

const defaultFormData: EmployeeFormData = {
  id: null,
  name: '',
  age: '',
  address: '',
  salary: '',
  position: '',
  status: '',
}

const requiredFields: (keyof EmployeeFormData)[] = ['name','age','address','salary','position','status'];

const positionOptions = ['Giam doc', 'Truong phong', 'Nhan vien'];
const statusOptions = ['Dang lam viec','Nghi thai san','Da thoi viec','Nghi phep'];

export default ({title, isOpen, isNew, onSave, onClose, dialogEmployee}: EmployeeDialogProp) => {
  const [formData, setFormData] = useState<EmployeeFormData>(()=>{
    if(isNew || !dialogEmployee){
      return defaultFormData;
    }else{
      return {
        id: dialogEmployee.id,
        name: dialogEmployee?.name ?? '',
        age: dialogEmployee?.age.toString() ?? '',
        address: dialogEmployee?.address ?? '',
        salary: dialogEmployee?.salary.toString() ?? '',
        position: dialogEmployee?.position ?? '',
        status: dialogEmployee?.status ?? '',
      }
    }
  });

  const [error, setError] = useState<string | null>(null);

  const onChange = (event: any) => {
    const {name, value} = event.target;
    setFormData(formData => ({...formData, [name]: value}));
    if(error) setError(null);
  }

  const onAutoCompleteChange = (fieldName: keyof EmployeeFormData, newValue: string|null) => {
    setFormData(formData => ({...formData, [fieldName]: newValue ?? ''}));
    if(error) setError(null);
  }

  const handleSave = () => {
    setError(null);
    // form validation
    const missingFields = requiredFields.filter(key => {
      const value = formData[key];
      return value === null || value === undefined || (typeof value ==='string' && value.trim() === '');
    })
    if(missingFields.length > 0){
      setError(`Please fill out all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const ageNum = Number(formData.age);
    if (isNaN(ageNum) || ageNum < 0){
      setError('Age must be a non-negative number!');
      return;
    }

    const salaryNum = Number(formData.salary);
    if(isNaN(salaryNum) || salaryNum < 0){
      setError('Salary must be a non-negative number!');
      return;
    }

    if(!positionOptions.includes(formData.position)){
      setError('Position is invalid!');
      return;
    }

    if(!statusOptions.includes(formData.status)){
      setError('Status is invalid!');
      return;
    }
    // end of validation

    const finalEmployeeData = {
      id: formData.id ?? 0,
      name: formData.name.trim(),
      age: ageNum,
      address: formData.address.trim(),
      salary: salaryNum,
      position: formData.position.trim(),
      status: formData.status.trim(),
    }

    onSave(finalEmployeeData, isNew);
  }

  return (
    <DialogContainer title={title}
                     isOpen={isOpen} onClose={onClose}
                     onConfirm={handleSave}>
        <Stack component="form" sx={{ width: 450}} spacing={2} autoComplete="off">
          <TextField name={'name'} fullWidth label="Name" variant="outlined"
                     required={requiredFields.includes('name')}
                     value={formData.name} onChange={onChange}
                     error={!!error && requiredFields.includes('name') && !formData.name.trim()}
                     helperText={!!error && requiredFields.includes('name') && !formData.name.trim() ? 'Name is required' : ''}
                     // error is set => !!error would be true
          />
          <TextField name={'age'} fullWidth label="Age" variant="outlined"
                     type={'number'}
                     required={requiredFields.includes('age')}
                     value={formData.age} onChange={onChange}
                     error={!!error && requiredFields.includes('age')
                       && (formData.age === '' || isNaN(Number(formData.age)) || Number(formData.age) < 0)}
                     helperText={!!error && requiredFields.includes('age')
                     && (formData.age === '' || isNaN(Number(formData.age)) || Number(formData.age) < 0) ? 'Must be a non-negative number' : ''}
          />
          <TextField name={'address'} fullWidth label="Address" variant="outlined"
                     required={requiredFields.includes('address')}
                     value={formData.address} onChange={onChange}
                     error={!!error && requiredFields.includes('address') && !formData.address.trim()}
                     helperText={!!error && requiredFields.includes('address') && !formData.address.trim() ? 'Address is required' : ''}
          />
          <TextField name={'salary'} fullWidth label="Salary" variant="outlined"
                     type={'number'}
                     required={requiredFields.includes('salary')}
                     value={formData.salary} onChange={onChange}
                     error={!!error && requiredFields.includes('salary')
                       && (formData.salary === '' || isNaN(Number(formData.salary)) || Number(formData.salary) < 0)}
                     helperText={!!error && requiredFields.includes('salary')
                     && (formData.salary === '' || isNaN(Number(formData.salary)) || Number(formData.salary) < 0) ? 'Must be a non-negative number' : ''}
          />

          <Autocomplete
            options={positionOptions}
            value={formData.position || null}
            onChange={(_event, newValue: string|null) => {
              onAutoCompleteChange('position', newValue);
            }}
            // Render a TextField ínside
            renderInput={(params ) => (
          <TextField {...params}
                     fullWidth label="Position" variant="outlined"
                     required={requiredFields.includes('position')}
                     error={!!error && requiredFields.includes('position') && !formData.position.trim()}
                     helperText={!!error && requiredFields.includes('position') && !formData.position.trim() ? 'Position is required' : ''}
          />)} />

          <Autocomplete
            options = {statusOptions}
            value = {formData.status || null}
            onChange = {(_event, newValue: string|null) => {
              onAutoCompleteChange('status', newValue);
            }}
            renderInput = {(params) => (
              <TextField {...params}
                         fullWidth label="Status" variant="outlined"
                         required={requiredFields.includes('status')}
                         error={!!error && requiredFields.includes('status') && !formData.status.trim()}
                         helperText={!!error && requiredFields.includes('status') && !formData.status.trim() ? 'Status is required' : ''}
              />
            )} />
          {
            error && (
              <Typography color="error" variant="body2" sx={{m: 1}}>
                {error}
              </Typography>
            )
          }

        </Stack>
    </DialogContainer>
  )
}