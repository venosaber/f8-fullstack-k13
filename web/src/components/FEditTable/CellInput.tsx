import {TextField} from "@mui/material";
import React, {useContext, useEffect, useState, useRef} from 'react';
import {TableContext} from './index.tsx';
import './style.sass';

export default () => {
  const context = useContext(TableContext);
  if(!context) return null;

  const {cursor, setCursor, columns, rows: tableRows, updateCellData, focusTable} = context;

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cursor.isEditing && cursor.rowIndex >= 0 && cursor.columnIndex >= 0) {
      if (tableRows[cursor.rowIndex] && columns[cursor.columnIndex]) {
        const columnName = columns[cursor.columnIndex].name;
        const currentValue = tableRows[cursor.rowIndex][columnName] || '';
        setInputValue(currentValue);
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        }, 0);
      }
    }
  }, [cursor.isEditing, cursor.rowIndex, cursor.columnIndex, tableRows, columns]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const commitChangeAndClose = (moveNext: boolean = false) => {
    if (cursor.isEditing && cursor.rowIndex >= 0 && cursor.columnIndex >= 0) {
      updateCellData(cursor.rowIndex, cursor.columnIndex, inputValue);

      if (moveNext) {
        let nextRow = cursor.rowIndex;
        let nextCol = cursor.columnIndex + 1;

        if (nextCol >= columns.length) {
          nextCol = 0;
          nextRow += 1;
        }

        if (nextRow < tableRows.length) {

          setTimeout(() => {
            const nextCellElement = document.querySelector(`.cell-${nextRow}-${nextCol}`) as HTMLElement;
            if (nextCellElement) {
              setCursor({
                rowIndex: nextRow,
                columnIndex: nextCol,
                top: nextCellElement.offsetTop,
                left: nextCellElement.offsetLeft,
                width: nextCellElement.offsetWidth,
                height: nextCellElement.offsetHeight,
                isEditing: false,
              });
              focusTable(); // Quan trọng: focus lại vào bảng để nhận sự kiện keydown
            } else {
              setCursor(prev => ({ ...prev, isEditing: false }));
              focusTable();
            }
          }, 0);
        } else {
          setCursor(prev => ({ ...prev, isEditing: false }));
          focusTable();
        }
      } else {
        setCursor(prev => ({ ...prev, isEditing: false }));
        focusTable();
      }
    }
  };

  const cancelChangeAndClose = () => {
    setCursor(prev => ({ ...prev, isEditing: false }));
    focusTable();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key){
      case 'Enter': {
        e.preventDefault();
        commitChangeAndClose(true);
        break;
      }
      case 'Tab': {
        e.preventDefault();
        commitChangeAndClose(!e.shiftKey);

        break;
      }
      case 'Escape': {
        e.preventDefault();
        cancelChangeAndClose();
        break;
      }
    }
  };

  const handleBlur = () => {

    if (cursor.isEditing) {

      updateCellData(cursor.rowIndex, cursor.columnIndex, inputValue);
      setCursor(prev => ({ ...prev, isEditing: false }));
    }
  };

  if (!cursor.isEditing || cursor.rowIndex === -1 || cursor.columnIndex === -1) {
    return null;
  }

  const cursorBorderWidth = 2;
  const style: React.CSSProperties = {
    position: 'absolute',
    top: `${cursor.top + cursorBorderWidth}px`,
    left: `${cursor.left + cursorBorderWidth}px`,
    width: `${Math.max(0, cursor.width - cursorBorderWidth * 2)}px`,
    height: `${Math.max(0, cursor.height - cursorBorderWidth * 2)}px`,
    zIndex: 10
  };

  return (
    <span style={style} className={`cell-input ${cursor.isEditing?'isEditing':''}`}>
      <TextField
        inputRef={inputRef}
        autoComplete={'off'}
        sx={{
          width: '100%',
          height: '100%',
          padding: 0,
          '& .MuiOutlinedInput-root': {
            height: '100%',
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': { border: '1px solid blue' },
          },
          '& .MuiOutlinedInput-input': {
            padding: '4px',
            height: '100%',
            boxSizing: 'border-box',
          },
        }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        size="small"
      />
    </span>
  );
};