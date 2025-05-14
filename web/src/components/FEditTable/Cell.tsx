import {TableCell} from "@mui/material";
import {Header, Employee} from '../../utils';
import {TableContext} from './index.tsx';
import React, {useContext, useRef} from 'react';

function Cell({column, row, columnIndex, rowIndex}:{column: Header, row: Employee, columnIndex: number, rowIndex: number}) {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Cell must be used within a TableContext.Provider");
  }
  const { cursor, setCursor, focusTable } = context;

  const cellRef = useRef<HTMLTableCellElement>(null);

  const handleClick = () => {
    if(cellRef.current){
      const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = cellRef.current;

      setCursor({
        rowIndex,
        columnIndex,
        top: offsetTop,
        left: offsetLeft,
        width: offsetWidth,
        height: offsetHeight,
        isEditing: false // Click will just select the cell
      });
      focusTable(); // focus on table to receive key events
    }
  };

  const handleDoubleClick = () => {
    if(cellRef.current){
      const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = cellRef.current;
      setCursor({
        rowIndex,
        columnIndex,
        top: offsetTop,
        left: offsetLeft,
        width: offsetWidth,
        height: offsetHeight,
        isEditing: true // double click to start editing
      });
      // no need to focusTable() because CellInput will focus
    }
  };

  const cellValue = row[column.name] || '';

  const isSelected = cursor.rowIndex === rowIndex && cursor.columnIndex === columnIndex;
  const isCurrentlyEditing = isSelected && cursor.isEditing;

  return (
    <TableCell
      size={"small"}
      className={
        `cell-common cell-${rowIndex}-${columnIndex}` +
        (isSelected ? ' selected' : '') +
        (isCurrentlyEditing ? ' editing-cell-underneath' : '') // Class cho ô đang bị CellInput che
      }
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      ref={cellRef}
      tabIndex={-1}
    >
      {/* Ẩn nội dung cell nếu đang edit để tránh bị thấy dưới CellInput trong suốt */}
      {isCurrentlyEditing ? '' : cellValue}
    </TableCell>
  );
}

export default Cell;