import {TextField, Stack, Typography} from "@mui/material";
import {ColorDialogProp} from "../../../utils";
import {useState} from "react";
import {DialogContainer} from "../../index.ts"


interface ColorFormData{
  id?: string;
  name: string;
}

const defaultFormData: ColorFormData = {
  id: '',
  name: '',
}

const requiredFields: (keyof ColorFormData)[] = ['name'];
export default ({title, isOpen, isNew, onSave, onClose, dialogColor}: ColorDialogProp) => {
  const [formData, setFormData] = useState<ColorFormData>(() => {
    if (isNew || !dialogColor) {
      return defaultFormData;
    } else {
      return {
        id: dialogColor.id,
        name: dialogColor?.name ?? ''
      }
    }
  });

  const [error, setError] = useState<string | null>(null);

  const onChange = (event: any) => {
    const {name, value} = event.target;
    setFormData(formData => ({...formData, [name]: value}));
    if (error) setError(null);
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
    // end of validation

    const finalColorData = {
      id: String(formData.id ?? Date.now()),
      name: formData.name.trim()
    }

    onSave(finalColorData, isNew);
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