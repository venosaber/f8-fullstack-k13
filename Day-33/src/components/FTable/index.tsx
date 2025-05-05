import {Table, TableBody, TableContainer, TableHead, Paper, TableCell, TableRow} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Header } from "../../utils";

interface Props {
  tableName: string;
  headers: Header[];
  rows: any[];
  onEdit: (row: any) => void;
  onDelete: (id: string) => void;
  width?: number;
}

export default ({tableName, headers, rows, onEdit, onDelete, width}: Props) => {
  const renderActionBtn = (headers: Header[], row: any) =>{
    const keys = headers.map(header => header.name);
    if(!keys.includes('action')) return;
    return (
      <TableCell>
        <EditIcon color={'success'} onClick={()=>onEdit(row)} />
        <DeleteIcon color={'error'} onClick={()=>onDelete(row.id)}/>
      </TableCell>
    )
  }

  return (
    <>
      <h2>{tableName}</h2>
      <TableContainer component={Paper} sx={{width: width, margin: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
            {
              headers.map((header: Header) => (
                <TableCell key={header.name}>{header.text}</TableCell>
              ))
            }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.map((row: any)=> (
                <TableRow key={row.id}>
                  {
                    Object.keys(row).map((rowKey: string) => (
                      <TableCell key={`${rowKey}-${row.id}`}>{row[rowKey]}</TableCell>
                    ))
                  }
                  {
                    renderActionBtn(headers, row)
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}