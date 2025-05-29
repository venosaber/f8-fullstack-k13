import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function MessageInput() {
  return (
    <Box sx={{ p: 2, borderTop: '1px solid #ddd', display: 'flex' }}>
      <TextField
        fullWidth
        placeholder="Type a message..."
        variant="outlined"
        size="small"
      />
      <IconButton color="primary" sx={{ ml: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}
