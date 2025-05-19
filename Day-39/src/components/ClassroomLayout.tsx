import { useMemo, cloneElement, useState, useEffect } from "react";
import {Box, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import { Link, Routes, Route, useParams, useLocation} from 'react-router-dom';
import {MembersContent, OverviewContent, TestsContent} from ".";

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

const ClassroomLayout = () => {

    const {id: classId } = useParams(); // get classId (id) from URL

    const location = useLocation();
    const [className, setClassName] = useState<string>('');
    useEffect(() => {
        const nameFromState = location.state?.className;
        if (nameFromState) {
            setClassName(nameFromState);
        }
    }, [location.state?.className]);

    // useMemo to only compute again the menuItems when classId changes
    const menuItems = useMemo(() => {
        return [
            {
                text: "Tổng quan",
                path: `/class/${classId}`,
                segment: undefined,
                icon: <DashboardIcon />
            },
            {
                text: "Bài thi",
                path: `/class/${classId}/exam`,
                segment: "exam",
                icon: <AssignmentIcon />
            },
            {
                text: "Thành viên",
                path: `/class/${classId}/member`,
                segment: "member",
                icon: <PeopleIcon />
            }
        ];
    }, [classId]);

    const isActive = (pathSegment?: string) => {
        if (!classId) return false;

        const basePath = `/class/${classId}`;
        const currentPath = location.pathname.endsWith('/') && location.pathname.length > 1
            ? location.pathname.slice(0, -1)
            : location.pathname;

        if (!pathSegment) {
            return currentPath === basePath;
        }
        return currentPath === `${basePath}/${pathSegment}`;
    };

    if (!classId) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Đang tải dữ liệu lớp học hoặc ID lớp không hợp lệ...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{mt: '64px', height: 'calc(100vh - 64px)', display: 'flex', backgroundColor: '#f5f5f5'}}>
            <Box sx={{width: '100%', maxWidth: 260, bgcolor: 'background.paper',
                display: {xs: 'none', md: 'flex'}, flexDirection: 'column', justifyContent: 'space-between'}}>
                <List component="nav" aria-label="main mailbox folders">
                    {menuItems.map((item) => {
                        const active = isActive(item.segment);
                        return (
                            <ListItemButton
                                key={item.text}
                                component={Link}
                                to={item.path}
                                selected={active}
                            >
                                <ListItemIcon>
                                    {cloneElement(item.icon, { color: active ? 'primary' : 'action' })}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        color: active ? 'primary' : 'action'
                                    }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
                <CopyrightInfo />
            </Box>

            <Box component="main" sx={{flexGrow: 1, p: 3, overflowY: 'auto'}}>
                <Routes>
                    <Route index element={<OverviewContent className={className} teacherName={teacherName} members={members} tests={tests}/>} />
                    <Route path="exam" element={<TestsContent tests={tests}/>} />
                    <Route path="member" element={<MembersContent members={members}/>} />
                </Routes>
            </Box>
        </Box>
    )
}

function CopyrightInfo(){
    return  (
        <Box sx={{p: 2, mt: 'auto'}}>
            <Typography variant="caption" color="text.secondary" sx={{display: 'block', textAlign: 'center'}}>
                ©2024 Allrights reserved
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{display: 'block', textAlign: 'center'}}>
                BKStar
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{display: 'block', textAlign: 'center'}}>
                Version 1.3.1
            </Typography>
        </Box>
    )
}

export default ClassroomLayout;