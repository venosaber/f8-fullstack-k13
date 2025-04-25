import {Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Box, Typography} from "@mui/material";
import {Product} from "../../../utils";
import {useState} from "react";

interface DialogContainer {
  isOpen: boolean,
  isNew: boolean,
  onSave: (product: Product, isNew: boolean) => void,
  onClose: () => void,
  width?: number,
  dialogProduct?: Product
}

export default ({isOpen, isNew, onSave, onClose, width, dialogProduct}: DialogContainer) => {
  const [name, setName] = useState(dialogProduct?.name ?? '');
  const [type, setType] = useState(dialogProduct?.type ?? '');
  const [origin, setOrigin] = useState(dialogProduct?.origin ?? '');

  // form validation
  const [error, setError] = useState<string | null>(null);
  const handleSave = () => {
    if(!name || !type || !origin){
      setError('Please fill all fields');
      return;
    }

    setError(null);
    // for editing an existing product: dialogProduct.id
    // for adding a new product: dialogProduct does not have id, use 0 for temporary
    const id = dialogProduct?.id ?? 0;
    const product = {id, name, type, origin};
    onSave(product, isNew);
  }

  return (
    <Dialog open={isOpen} sx={{width: width, margin: 'auto'}}>
      <DialogTitle>Product Information</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{'& .MuiTextField-root': {m: 1}}}
          noValidate
          autoComplete="off"
          onSubmit={e => e.preventDefault()}
        >
          <TextField id={'name'} fullWidth label="Name" variant="outlined" required={true}
                     value={name} onChange={(e) => setName(e.target.value)}
                     error={!!error && !name} helperText={!!error && !name ? 'Name is required' : ''}
                     // error is set => !!error would be true
          />
          <TextField id={'type'} fullWidth label="Type" variant="outlined" required={true}
                     value={type} onChange={(e) => setType(e.target.value)}
                     error={!!error && !type} helperText={!!error && !type ? 'Type is required' : ''}/>
          <TextField id={'origin'} fullWidth label="Origin" variant="outlined" required={true}
                     value={origin} onChange={(e) => setOrigin(e.target.value)}
                     error={!!error && !origin} helperText={!!error && !origin ? 'Origin is required' : ''}/>

          {
            error && (
              <Typography color="error" variant="body2" sx={{m: 1}}>
                {error}
              </Typography>
            )
          }

        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSave} sx={{margin: 'auto', padding: '10px 70px'}}
                color={'success'}>Save</Button>
        <Button variant="contained" onClick={onClose} sx={{margin: 'auto', padding: '10px 70px'}}
                color={'error'}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}