import {FHeader} from '../../components'
import {Container, Box, Typography, TextField, InputAdornment, Button} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import {CourseGrid} from '../../components';
import type {Course} from '../../utils';

const mockCourses: Course[] = [
    {id: '19', name: 'Test Thi Thu', memberCount: 1, classCode: '123456'},
    {id: '2', name: 'lol', memberCount: 1, classCode: '123456'},
    {id: '3', name: 'A1', memberCount: 1, classCode: '123456'},
    {id: '4', name: 'A2', memberCount: 1, classCode: 'abcdef'},
];

function Classes() {
    const handleAddCourseClick = () => {
        console.log('add course')
    }

    return (
        <>
            <FHeader/>
            <Container maxWidth={false}
                       sx={{
                           mt: '64px', backgroundColor: '#f0f2f5',
                           minHeight: 'calc(100vh - 64px)', p: 3
                       }}>

                {/* Page title & controls */}
                <Box sx={{display: {md: 'flex'}, alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
                    <Typography variant="h5" component="h1" gutterBottom sx={{fontWeight: 'bold', color: '#333'}}>
                        Danh sách lớp học
                    </Typography>

                    <Box sx={{ml: 'auto', mr: 2, my: 2, minWidth: '300px'}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Tìm kiếm"
                            size="small"
                            sx={{
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
                    </Box>

                    <Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            onClick={handleAddCourseClick}
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
                </Box>

                {/* Course grid */}
                <Box sx={{mt: 3}}>
                    <CourseGrid courses={mockCourses}/>
                </Box>
            </Container>
        </>
    )
}

export default Classes;