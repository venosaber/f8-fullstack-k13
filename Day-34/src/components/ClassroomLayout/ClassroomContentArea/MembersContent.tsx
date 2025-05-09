import type {Member} from "../../../utils";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

interface MembersContentProps {
  members: Member[]
}

export default function MembersContent({members}: MembersContentProps) {
  return (
    <Box sx={{mt: 3}}>
      <Typography variant="h4" fontWeight="bold" sx={{mb: 2}}>
        Danh sách thành viên
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{p: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold', color: '#666'}}>NO.</TableCell>
              <TableCell sx={{fontWeight: 'bold', color: '#666'}}>HỌ TÊN</TableCell>
              <TableCell sx={{fontWeight: 'bold', color: '#666'}}>VỊ TRÍ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member: Member) => (
              <TableRow
                key={member.id}
                sx={member.id % 2 === 0 ? {} : {backgroundColor: '#f5f9fc'}}
              >
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}