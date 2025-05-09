import {CourseControls, CourseGrid, FHeader} from '../../components';
import {Box, Container, Typography} from '@mui/material';
import './styles.css'
import type {Course} from '../../utils'

const mockCourses: Course[] = [
  {id: '19', name: 'Test Thi Thu', memberCount: 1, classCode: '123456'},
  {id: '2', name: 'lol', memberCount: 1, classCode: '123456'},
  {id: '3', name: 'A1', memberCount: 1, classCode: '123456'},
  {id: '4', name: 'A2', memberCount: 1, classCode: 'abcdef'},
];


export default function Class() {
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
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
          <Typography variant="h5" component="h1" gutterBottom sx={{fontWeight: 'bold', color: '#333'}}>
            Danh sách lớp học
          </Typography>

          <CourseControls
            onAddCourseClick={handleAddCourseClick}
          />
        </Box>


        <Box sx={{mt: 3}}>
          <CourseGrid courses={mockCourses}/>
        </Box>
      </Container>
    </>
  )
}