import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Header, Employee, Cursor} from '../../utils';
import Row from './Row.tsx';
import './style.sass';
import CellCursor from './CellCursor.tsx';
import CellInput from './CellInput.tsx';
import React, {createContext, useState, useEffect, useCallback, useRef} from 'react';

const defaultCursor: Cursor = {
  rowIndex: -1,
  columnIndex: -1,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  isEditing: false
};

export interface TableContextType {
  cursor: Cursor;
  setCursor: React.Dispatch<React.SetStateAction<Cursor>>;
  columns: Header[];
  rows: Employee[];
  updateCellData: (rowIndex: number, columnIndex: number, value: string) => void;
  focusTable: () => void;
}

export const TableContext = createContext<TableContextType | null>(null);

function FTableComponent({ columns: initialColumns, rows: initialRows }: { columns: Header[], rows: Employee[] }) {
  const [cursor, setCursor] = useState<Cursor>({ ...defaultCursor });
  const [tableRows, setTableRows] = useState<Employee[]>(initialRows);
  const tableRef = useRef<HTMLTableElement>(null); // Ref for table

  useEffect(() => {
    setTableRows(initialRows);
  }, [initialRows]);

  const updateCellData = useCallback((rowIndex: number, columnIndex: number, value: string) => {
    if (columnIndex < 0 || columnIndex >= initialColumns.length) {
      console.error("Invalid columnIndex for updateCellData:", columnIndex);
      return;
    }
    const columnName = initialColumns[columnIndex].name;
    setTableRows(prevRows => {
      const newRows = prevRows.map((row, rIdx) => {
        if (rIdx === rowIndex) {
          return {
            ...row,
            [columnName]: value
          };
        }
        return row;
      });
      return newRows;
    });
  }, [initialColumns]);

  const focusTable = useCallback(() => {
    tableRef.current?.focus();
  }, []);

  const providerValue: TableContextType = {
    cursor,
    setCursor,
    columns: initialColumns,
    rows: tableRows,
    updateCellData,
    focusTable
  };

  const moveToCell = (rIdx: number, cIdx: number, startEditing: boolean = false) => {
    const targetCell = document.querySelector(`.cell-${rIdx}-${cIdx}`) as HTMLElement;
    if (targetCell) {
      setCursor({
        rowIndex: rIdx,
        columnIndex: cIdx,
        top: targetCell.offsetTop,
        left: targetCell.offsetLeft,
        width: targetCell.offsetWidth,
        height: targetCell.offsetHeight,
        isEditing: startEditing,
      });
    }
  };

  const onTableKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    // keydown events should be handled by CellInput while in edit mode
    if (cursor.isEditing) {
      return;
    }

    const { rowIndex, columnIndex } = cursor;

    if (rowIndex === -1 || columnIndex === -1) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key) && tableRows.length > 0 && initialColumns.length > 0) {
        // pick default the first cell if no cells are selected yet
        moveToCell(0, 0, e.key === 'Enter');
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'Enter':
        // if the cell is selected but edit mode is off, turn on
        moveToCell(rowIndex, columnIndex, true);
        e.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight': {
        e.preventDefault();
        let nextRow = rowIndex;
        let nextCol = columnIndex;

        if (e.key === 'ArrowUp') nextRow = Math.max(0, rowIndex - 1);
        if (e.key === 'ArrowDown') nextRow = Math.min(tableRows.length - 1, rowIndex + 1);
        if (e.key === 'ArrowLeft') nextCol = Math.max(0, columnIndex - 1);
        if (e.key === 'ArrowRight') nextCol = Math.min(initialColumns.length - 1, columnIndex + 1);

        if (nextRow !== rowIndex || nextCol !== columnIndex) {
          moveToCell(nextRow, nextCol);
        }
        break;
      }

    }
  };

  return (
    <TableContext.Provider value={providerValue}>
      <Table
        ref={tableRef}
        className={'f-editable-table'}
        onKeyDown={onTableKeyDown}
        tabIndex={0} // to let table receive focus and keydown events
      >
        <TableHead>
          <TableRow>
            {
              initialColumns.map((column: Header) => (
                <TableCell size={"small"} key={column.name}>{column.text}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tableRows?.map((row: Employee, rIdx: number) => (
              <Row key={`row-${row.id || rIdx}`}
                   columns={initialColumns} row={row}
                   rowIndex={rIdx}
              />
            ))
          }
        </TableBody>
      </Table>
      <CellCursor />
      <CellInput />
    </TableContext.Provider>
  );
}

export default FTableComponent;