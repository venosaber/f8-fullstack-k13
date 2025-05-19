import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {CourseCard} from '.';
import type {Course} from '../utils';

interface CourseGridProps {
    courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({courses}) => {
    if (!courses || courses.length === 0) {
        return (
            <Box sx={{textAlign: 'center', mt: 5}}>
                <Typography variant="h6" color="text.secondary">
                    Không tìm thấy lớp học nào.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {courses.map((course: Course) => (
                <Grid key={course.id} size={{sm: 12, md: 6, lg: 4}} width={'100%'}>
                    <CourseCard course={course}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default CourseGrid;