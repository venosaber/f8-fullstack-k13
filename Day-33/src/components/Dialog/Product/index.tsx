import {TextField, Stack, Typography, Autocomplete} from "@mui/material";
import {Color, ProductDialogProp} from "../../../utils";
import {useState} from "react";
import {DialogContainer} from "../../index.ts"

interface ProductFormData{
  id?: string ;
  name: string;
  shortName: string;
  code: string;
  expectedPrice: string;  // not number but string, to be more flexible
  description: string;
  color: string;
}

const defaultFormData: ProductFormData = {
  id: '',
  name: '',
  shortName: '',
  code: '',
  expectedPrice: '',
  description: '',
  color: ''
}

const requiredFields: (keyof ProductFormData)[] = ['name','code','expectedPrice','color'];

export default ({title, isOpen, isNew, onSave, onClose, dialogProduct, colorOptions}: ProductDialogProp) => {
  const [formData, setFormData] = useState<ProductFormData>(()=>{
    if(isNew || !dialogProduct){
      return defaultFormData;
    }else{
      return {
        id: dialogProduct.id,
        name: dialogProduct?.name ?? '',
        shortName: dialogProduct?.shortName ?? '',
        code: dialogProduct?.code ?? '',
        expectedPrice: dialogProduct?.expectedPrice.toString() ?? '',
        description: dialogProduct?.description ?? '',
        color: dialogProduct?.color.toString() ?? ''
      }
    }
  });

  const [error, setError] = useState<string | null>(null);

  const onChange = (event: any) => {
    const {name, value} = event.target;
    setFormData(formData => ({...formData, [name]: value}));
    if(error) setError(null);
  }

  const handleSave = () => {
    setError(null);
    // form validation
    const missingFields = requiredFields.filter(key => {
      const value = formData[key];
      return value === null || value === undefined || (value.trim() === '');
    })
    if(missingFields.length > 0){
      setError(`Please fill out all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const expectedPriceNum = Number(formData.expectedPrice);
    if (isNaN(expectedPriceNum) || expectedPriceNum < 0){
      setError('Expected price must be a non-negative number!');
      return;
    }

    const selectedColorId = colorOptions.find((color: Color) => color.name === formData.color)?.id;
    if(!selectedColorId){
      setError('Color is invalid!');
      return;
    }

    // end of validation

    const finalProductData = {
      // for editing an existing product: dialogProduct.id
      // for adding a new product: dialogProduct does not have id, use Date.now() for temporary
      id: String(formData.id ?? Date.now()),
      name: formData.name.trim(),
      shortName: formData.shortName.trim(),
      code: formData.code.trim(),
      expectedPrice: expectedPriceNum,
      description: formData.description.trim(),
      color: Number(selectedColorId)
    }

    onSave(finalProductData, isNew);
  }

  // use this variable as a prop 'value' of Autocomplete
  const selectedColorObject = colorOptions.find(option => option.name === formData.color) || null;

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
          <TextField name={'shortName'} fullWidth label="Short Name" variant="outlined"
                     required={requiredFields.includes('shortName')}
                     value={formData.shortName} onChange={onChange}
                     error={!!error && requiredFields.includes('shortName') && !formData.shortName.trim()}
                     helperText={!!error && requiredFields.includes('shortName') && !formData.shortName.trim() ? 'Short name is required' : ''}
          />
          <TextField name={'code'} fullWidth label="Code" variant="outlined"
                     required={requiredFields.includes('name')}
                     value={formData.code} onChange={onChange}
                     error={!!error && requiredFields.includes('code') && !formData.code.trim()}
                     helperText={!!error && requiredFields.includes('code') && !formData.code.trim() ? 'Code is required' : ''}
          />
          <TextField name={'expectedPrice'} fullWidth label="Expected Price" variant="outlined"
                     type={'number'}
                     required={requiredFields.includes('expectedPrice')}
                     value={formData.expectedPrice} onChange={onChange}
                     error={!!error && requiredFields.includes('expectedPrice')
                       && (formData.expectedPrice === '' || isNaN(Number(formData.expectedPrice)) || Number(formData.expectedPrice) < 0)}
                     helperText={!!error && requiredFields.includes('expectedPrice')
                     && (formData.expectedPrice === '' || isNaN(Number(formData.expectedPrice)) || Number(formData.expectedPrice) < 0) ? 'Must be a non-negative number' : ''}
          />

          <TextField name={'description'} fullWidth label="Description" variant="outlined"
                     required={requiredFields.includes('description')}
                     value={formData.description} onChange={onChange}
                     error={!!error && requiredFields.includes('description') && !formData.description.trim()}
                     helperText={!!error && requiredFields.includes('description') && !formData.description.trim() ? 'Description is required' : ''}
          />

          <Autocomplete
            options={colorOptions}
            getOptionLabel={(option: Color) => option.name} // just show the name, not the id of color
            value={selectedColorObject}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_event, newValue: Color | null) => {
              setFormData(formData => ({...formData, color: newValue?.name ?? ''}));
              if(error) {
                setError(null);
            }}}
            // Render a TextField ínside
            renderInput={(params ) => (
              <TextField {...params}
                         fullWidth label="Color" variant="outlined"
                         required={requiredFields.includes('color')}
                         error={!!error && requiredFields.includes('color') && !formData.color}
                         helperText={!!error && requiredFields.includes('color') && !formData.color ? 'Color is required' : ''}
              />)} />


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