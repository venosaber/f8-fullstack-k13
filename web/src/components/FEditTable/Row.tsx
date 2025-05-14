import {TableRow} from '@mui/material'
import Cell from './Cell.tsx'
import {Employee, Header} from '../../utils'

function Row({columns, row, rowIndex}: { columns: Header[], row: Employee, rowIndex: number }) {
  return (
    <TableRow key={row.id}>
      {
        columns.map((column: Header, columnIndex: number) => {
          return (<Cell key={`column-${columnIndex}`}
                        column={column}
                        row={row}
                        columnIndex={columnIndex}
                        rowIndex={rowIndex}
          />)
        })
      }
    </TableRow>
  )
}

export default Row;