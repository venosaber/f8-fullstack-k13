import {TableCell} from '@mui/material'
import {TableContext} from './index.tsx'
import {useContext, useRef} from 'react'

function Cell({column, row, rowIndex, columnIndex}){
  const injector = useContext(TableContext);
  const {cursor, setCursor, startEditingCell} = injector;
  const cellRef = useRef(null);

  const onClick = ()=>{
    if(cellRef.current){
      const {offsetWidth, offsetHeight, offsetTop, offsetLeft} = cellRef.current;
      setCursor(prevCursor => ({
        ...prevCursor, // Keep existing isEditing state if already editing elsewhere
        rowIndex,
        columnIndex,
        width: offsetWidth,
        height: offsetHeight,
        top: offsetTop,
        left: offsetLeft,
        isEditing: prevCursor.rowIndex === rowIndex && prevCursor.columnIndex === columnIndex
          ? prevCursor.isEditing
          : false // Set isEditing false if clicking a *different* cell
      }))
    }

  }
  const cell = row[column.name] || '';

  const onDoubleClick = ()=>{
    // Update cursor's position first if it's not the current cell
    if(cellRef.current && (cursor.rowIndex !== rowIndex || cursor.columnIndex !== columnIndex)){
      const {offsetWidth, offsetHeight, offsetTop, offsetLeft} = cellRef.current;
      setCursor({
        rowIndex,
        columnIndex,
        width: offsetWidth,
        height: offsetHeight,
        top: offsetTop,
        left: offsetLeft,
        isEditing: false // Will be set to true by startEditingCell
      });
    }
    // Then call startEditingCell, which will set isEditing: true
    // and CellInput's useEffect will handle the focus.
    startEditingCell();
  }

  return (
    <TableCell
      sx={{padding: 0, textAlign: 'center'}}
      ref={cellRef}
      size={'small'}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`cell-${rowIndex}-${columnIndex}`}
    >{cell}</TableCell>
  )
}

export default Cell;