import {TextField, Stack, Typography} from "@mui/material";
import {ProductDialogProp} from "../../../utils";
import {useState} from "react";
import {DialogContainer} from "../../index.ts"

interface ProductFormData{
  id?: number | null;
  name: string;
  shortName: string;
  code: string;
  importPrice: string;  // not number but string, to be more flexible
  price: string;
  remaining: string;
  expDate: string;
  desc: string;
  color: string;
  unit: string;
}

const defaultFormData: ProductFormData = {
  id: null,
  name: '',
  shortName: '',
  code: '',
  importPrice: '',
  price: '',
  remaining: '',
  expDate: '',
  desc: '',
  color: '',
  unit: '',
}

const requiredFields: (keyof ProductFormData)[] = ['name','code','importPrice','price','remaining','expDate','unit'];

export default ({title, isOpen, isNew, onSave, onClose, dialogProduct}: ProductDialogProp) => {
  const [formData, setFormData] = useState<ProductFormData>(()=>{
    if(isNew || !dialogProduct){
      return defaultFormData;
    }else{
      return {
        id: dialogProduct.id,
        name: dialogProduct?.name ?? '',
        shortName: dialogProduct?.shortName ?? '',
        code: dialogProduct?.code ?? '',
        importPrice: dialogProduct?.importPrice.toString() ?? '',
        price: dialogProduct?.price.toString() ?? '',
        remaining: dialogProduct?.remaining.toString() ?? '',
        expDate: dialogProduct?.expDate ?? '',
        desc: dialogProduct?.desc ?? '',
        color: dialogProduct?.color ?? '',
        unit: dialogProduct?.unit ?? '',
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
      return value === null || value === undefined || (typeof value ==='string' && value.trim() === '');
    })
    if(missingFields.length > 0){
      setError(`Please fill out all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const importPriceNum = Number(formData.importPrice);
    if (isNaN(importPriceNum) || importPriceNum < 0){
      setError('Import price must be a non-negative number!');
      return;
    }

    const priceNum = Number(formData.price);
    if(isNaN(priceNum) || priceNum < 0){
      setError('Price must be a non-negative number!');
      return;
    }

    const remainingNum = Number(formData.remaining);
    if(isNaN(remainingNum) || remainingNum < 0){
      setError('Remaining quantity must be a non-negative number!');
      return;
    }
    // end of validation

    const finalProductData = {
      // for editing an existing product: dialogProduct.id
      // for adding a new product: dialogProduct does not have id, use 0 for temporary
      id: formData.id ?? 0,
      name: formData.name.trim(),
      shortName: formData.shortName.trim(),
      code: formData.code.trim(),
      importPrice: importPriceNum,
      price: priceNum,
      remaining: remainingNum,
      expDate: formData.expDate.trim(),
      desc: formData.desc.trim(),
      color: formData.color.trim(),
      unit: formData.unit.trim()
    }

    onSave(finalProductData, isNew);
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
          <TextField name={'importPrice'} fullWidth label="Import Price" variant="outlined"
                     type={'number'}
                     required={requiredFields.includes('importPrice')}
                     value={formData.importPrice} onChange={onChange}
                     error={!!error && requiredFields.includes('importPrice')
                       && (formData.importPrice === '' || isNaN(Number(formData.importPrice)) || Number(formData.importPrice) < 0)}
                     helperText={!!error && requiredFields.includes('importPrice')
                     && (formData.importPrice === '' || isNaN(Number(formData.importPrice)) || Number(formData.importPrice) < 0) ? 'Must be a non-negative number' : ''}
          />
          <TextField name={'price'} fullWidth label="Price" variant="outlined"
                     type={'number'}
                     required={requiredFields.includes('price')}
                     value={formData.price} onChange={onChange}
                     error={!!error && requiredFields.includes('price')
                       && (formData.price === '' || isNaN(Number(formData.price)) || Number(formData.price) < 0)}
                     helperText={!!error && requiredFields.includes('price')
                     && (formData.price === '' || isNaN(Number(formData.price)) || Number(formData.price) < 0) ? 'Must be a non-negative number' : ''}
          />
          <TextField name={'remaining'} fullWidth label="Remaining" variant="outlined"
                     type={'number'}
                     required={requiredFields.includes('remaining')}
                     value={formData.remaining} onChange={onChange}
                     error={!!error && requiredFields.includes('remaining')
                       && (formData.remaining === '' || isNaN(Number(formData.remaining)) || Number(formData.remaining) < 0)}
                     helperText={!!error && requiredFields.includes('remaining')
                     && (formData.remaining === '' || isNaN(Number(formData.remaining)) || Number(formData.remaining) < 0) ? 'Must be a non-negative number' : ''}
          />
          <TextField name={'expDate'} fullWidth label="Expiry Date" variant="outlined"
                     required={requiredFields.includes('expDate')}
                     value={formData.expDate} onChange={onChange}
                     error={!!error && requiredFields.includes('expDate') && !formData.expDate.trim()}
                     helperText={!!error && requiredFields.includes('expDate') && !formData.expDate.trim() ? 'Expiry date is required' : ''}
          />
          <TextField name={'desc'} fullWidth label="Description" variant="outlined"
                     required={requiredFields.includes('desc')}
                     value={formData.desc} onChange={onChange}
                     error={!!error && requiredFields.includes('desc') && !formData.desc.trim()}
                     helperText={!!error && requiredFields.includes('desc') && !formData.desc.trim() ? 'Description is required' : ''}
          />
          <TextField name={'color'} fullWidth label="Color" variant="outlined"
                     required={requiredFields.includes('color')}
                     value={formData.color} onChange={onChange}
                     error={!!error && requiredFields.includes('color') && !formData.color.trim()}
                     helperText={!!error && requiredFields.includes('color') && !formData.color.trim() ? 'Color is required' : ''}
          />
          <TextField name={'unit'} fullWidth label="Unit" variant="outlined"
                     required={requiredFields.includes('unit')}
                     value={formData.unit} onChange={onChange}
                     error={!!error && requiredFields.includes('desc') && !formData.desc.trim()}
                     helperText={!!error && requiredFields.includes('desc') && !formData.desc.trim() ? 'Description is required' : ''}
          />


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