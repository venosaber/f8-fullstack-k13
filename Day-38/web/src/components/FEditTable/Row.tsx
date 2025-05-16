import {TableRow} from "@mui/material";
import Cell from './Cell.tsx'

function Row({columns, row, rowIndex}){
  return (
    <TableRow key={row.id}>
      {
        columns.map((column: object, columnIndex: number) => {
          return (
            <Cell
              key={`column-${columnIndex}`}
              column={column} row={row}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
            />
          )
        })
      }
    </TableRow>
  )
}

export default Row;