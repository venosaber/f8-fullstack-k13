import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShareIcon from '@mui/icons-material/Share';
import type {Course} from '../../utils';
import {useNavigate} from 'react-router-dom';

const CourseCard = ({course}: {course: Course}) => {
  const navigate = useNavigate();

  const onEnterClass = (course: Course) => {
    navigate(`/class/${course.id}`, { state: { className: course.name } });
  };

  const cardBackgroundColor = course.themeColor || '#29b6f6';
  return (
    <Card
      sx={{
        backgroundColor: cardBackgroundColor,
        color: 'white',
        borderRadius: '12px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }
      }}
    >
      <Box sx={{p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        {/* Class name & Enter button */}
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1}}>

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              flexGrow: 1,
              mr: 1,

              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {course.name}
          </Typography>

          <Button
            size="small"
            startIcon={<MeetingRoomIcon/>}
            onClick={()=>onEnterClass(course)}
            sx={{
              color: 'white',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              p: '2px 8px',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Vào lớp
          </Button>

        </Box>

        {/* Members count */}
        <Box sx={{
          my: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>

          <Typography
            variant="h2"
            component="div"
            sx={{fontWeight: 'bold', lineHeight: 1}}
          >
            {course.memberCount}
          </Typography>
        </Box>

        {/* Class code & Share button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1
          }}
        >
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, mr: 1}}>
            <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.8)'}}>
              Thành viên tham gia
            </Typography>
            <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.9)'}}>
              Mã lớp: {course.classCode}
            </Typography>
          </Box>


          <Button
            variant="outlined"
            size="small"
            startIcon={<ShareIcon fontSize="inherit"/>}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              textTransform: 'none',
              borderRadius: '16px',
              p: '2px 10px',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Chia sẻ
          </Button>
        </Box>
      </Box>

    </Card>
  );
};

export default CourseCard;