import './style.sass'
import CellCursor from './CellCursor.tsx'
import CellInput from './CellInput.tsx'
import {createContext, useCallback, useState} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'
import Row from './Row.tsx'

const defaultCursor = {
  rowIndex: 0,
  columnIndex: 0,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  isEditing: false
}

const TableContext = createContext(null);

function FEditTableComponent({columns, rows}: { columns: object[], rows: object[] }) {
  const [cursor, setCursor] = useState({...defaultCursor});

  const startEditingCell = useCallback(() => {
    setCursor(prev => ({...prev, isEditing: true}));
  }, [setCursor]);

  const provider = {
    cursor, setCursor, rows, columns, startEditingCell
  }

  const onTableKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // If already editing, let CellInput handle its own key events
    if (cursor.isEditing) {
      return;
    }

    let newRowIndex = cursor.rowIndex;
    let newColumnIndex = cursor.columnIndex;
    let moved = false;

    switch (e.key) {
      case 'ArrowUp':
        if (cursor.rowIndex > 0) {
          newRowIndex = cursor.rowIndex - 1;
          moved = true;
        }
        break;
      case 'ArrowDown':
        if (cursor.rowIndex < rows.length - 1) {
          newRowIndex = cursor.rowIndex + 1;
          moved = true;
        }
        break;
      case 'ArrowLeft':
        if (cursor.columnIndex > 0) {
          newColumnIndex = cursor.columnIndex - 1;
          moved = true;
        }
        break;
      case 'ArrowRight':
        if (cursor.columnIndex < columns.length - 1) {
          newColumnIndex = cursor.columnIndex + 1;
          moved = true;
        }
        break;
      case 'Enter': // Enter on a selected (but not editing) cell
        if (!cursor.isEditing) {
          startEditingCell();
          e.preventDefault();
        }
        return; // Return early to avoid moving cursor after starting edit
      default:
        // For other keys (like alphanumeric), if a cell is selected, start editing
        if (!cursor.isEditing) {
          startEditingCell();
        }
        return;
    }

    if (moved) {
      e.preventDefault(); // Prevent default browser scroll behavior for arrow keys
      const nextCellElement = document.querySelector(`.cell-${newRowIndex}-${newColumnIndex}`);
      if (nextCellElement) {
        setCursor({
          rowIndex: newRowIndex,
          columnIndex: newColumnIndex,
          top: (nextCellElement as HTMLElement).offsetTop,
          left: (nextCellElement as HTMLElement).offsetLeft,
          width: (nextCellElement as HTMLElement).offsetWidth,
          height: (nextCellElement as HTMLElement).offsetHeight,
          isEditing: false // Arrow key navigation selects the cell, doesn't start editing
        });
      }
    }
  }

  return (
    <TableContext.Provider value={provider}>
      <Table className={'f-editable-table'}
             onKeyDown={onTableKeyDown}
             tabIndex={0}
      >
        <TableHead>
          <TableRow>
            {
              columns.map((column) => {
                return (<TableCell size={"small"} key={column.name}>{column.name}</TableCell>)
              })
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            rows?.map((row: object, rowIndex: number) => {
              return (
                <Row key={`row-${rowIndex}`}
                     columns={columns} row={row}
                     rowIndex={rowIndex}/>
              )
            })
          }

        </TableBody>
      </Table>

      <CellCursor/>
      <CellInput/>
    </TableContext.Provider>
  )
}

export {TableContext}
export default FEditTableComponent;