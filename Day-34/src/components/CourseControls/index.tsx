import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

interface CourseControlsProps {
  onAddCourseClick: () => void;
}

const CourseControls: React.FC<CourseControlsProps> = ({
                                                         onAddCourseClick,
                                                       }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        my: 2
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Tìm kiếm"
        size="small"
        sx={{
          flexGrow: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'white',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{color: 'action.active'}}/>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon/>}
        onClick={onAddCourseClick}
        sx={{
          backgroundColor: '#f7c32e',
          color: '#333',
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '8px 16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#e0b028',
          },
        }}
      >
        Thêm lớp học
      </Button>
    </Box>
  );
};

export default CourseControls;