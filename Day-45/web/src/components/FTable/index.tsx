import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Header, Master} from '../../utils'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {memo} from 'react'

interface FTable {
  headers: Header[]
  rows: Master[]
  onUpdate: (id: number) => void
  onDelete: (id: number) => void
  width?: number
}

const RenderActionBtn = (
  headers: Header[],
  rowId: number,
  onUpdate: () => void,
  onDelete: () => void
) => {
  const keys = headers.map(header => header.name)
  if (!keys.includes('action')) return

  return (
    <TableCell size={"small"} key={`action-${rowId}`}>
      <EditIcon color={'success'} onClick={onUpdate}/>
      <DeleteOutlineIcon color={'error'} onClick={onDelete}/>
    </TableCell>
  )
}


function FTableComponent({headers, rows, onUpdate, onDelete, width}: FTable) {

  return (
    <>
      <TableContainer sx={{maxWidth: width, margin: 'auto'}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {
                headers.map((header: Header) => {
                  return <TableCell size={"small"} key={header.name}>{header.text}</TableCell>
                })
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {
              rows?.map((row: Master) => {
                return (
                  <TableRow key={row.id}>
                    {
                      headers.map((header: Header) => {
                        if (header.name === 'action') {

                          return RenderActionBtn(headers, row.id,
                              () => onUpdate(row.id),
                              ()=> onDelete(row.id)
                          )
                        }

                        const rowKey: string = header.name
                        // const header = headers.find(h => h.name === rowKey)
                        return (
                          <TableCell size={"small"} key={`${rowKey}-${row.id}`}>
                            {
                              // @ts-expect-error the type is not clear
                              row[rowKey]
                                  // @ts-expect-error the type is not clear
                                ? header?.displayProperty ? row[rowKey][header.displayProperty] : row[rowKey]
                                : ''
                            }
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                )
              })
            }

          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default memo(FTableComponent)