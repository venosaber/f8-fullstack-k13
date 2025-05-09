import React, {useState} from "react";
import {Box, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import {MembersContent, OverviewContent, TestsContent} from "./ClassroomContentArea";
import Typography from "@mui/material/Typography";

const ClassroomLayout = ({className}:{className: string}) => {
  // Mock data
  const teacherName = "Trần Xuân Bảng";
  const members = [
    {id: 1, name: "Trần Xuân Bảng", role: "Giáo viên"},
    {id: 2, name: "Phạm Thùy Dương", role: "Học sinh"},
    {id: 3, name: "bang", role: "Học sinh"},
  ];

  const tests = [
    {id: 1, name: "ĐỀ THI LẦN 1", date: "23-01-2024 04:40:21"},
    {id: 2, name: "Thi thu lan 2", date: "26-01-2024 10:59:23"},
    {id: 3, name: "Thu Thu Lan 3", date: "28-01-2024 10:21:55"},
    {id: 4, name: "Thi Thu 4", date: "30-01-2024 09:04:04"},
    {id: 5, name: "Thu Thi 5", date: "22-04-2024 06:24:49"},
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <OverviewContent className={className} teacherName={teacherName} members={members} tests={tests}/>;
      case 1:
        return <TestsContent tests={tests}/>;
      case 2:
        return <MembersContent members={members}/>;
      default:
        return <OverviewContent className={className} teacherName={teacherName} members={members} tests={tests}/>;
    }
  }

  return (
    <Box sx={{mt: '64px', height: 'calc(100vh - 64px)', display: 'flex', backgroundColor: '#f5f5f5'}}>

      {/*sidebar*/}
      <Box sx={{width: '100%', maxWidth: 260, bgcolor: 'background.paper',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <DashboardIcon color={selectedIndex === 0 ? 'primary' : 'action'}/>
            </ListItemIcon>
            <ListItemText primary="Tổng quan"
                          slotProps={{
                            primary: {
                              color: selectedIndex === 0 ? 'primary' : 'action'
                            }
                          }}
            />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <AssignmentIcon color={selectedIndex === 1 ? 'primary' : 'action'}/>
            </ListItemIcon>
            <ListItemText primary="Bài thi"
                          slotProps={{
                            primary: {
                              color: selectedIndex === 1 ? 'primary' : 'action'
                            }
                          }}/>
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <PeopleIcon color={selectedIndex === 2 ? 'primary' : 'action'}/>
            </ListItemIcon>
            <ListItemText primary="Thành viên"
                          slotProps={{
                            primary: {
                              color: selectedIndex === 2 ? 'primary' : 'action'
                            }
                          }}/>
          </ListItemButton>
        </List>

        <CopyrightInfo />
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{flexGrow: 1, p: 3, overflowY: 'auto'}}>
        {renderContent()}
      </Box>

    </Box>
  )

}

function CopyrightInfo(){
  return  (
    <Box sx={{p: 2, mt: 'auto'}}>
      <Typography variant="caption" color="text.secondary" sx={{display: 'block', textAlign: 'center'}}>
        ©2024 Allrights reserved BKStar
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{display: 'block', textAlign: 'center'}}>
        Version 1.3.1
      </Typography>
    </Box>
  )
}

export default ClassroomLayout;