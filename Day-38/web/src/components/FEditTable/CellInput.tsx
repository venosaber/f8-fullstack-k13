import {Autocomplete, TextField} from '@mui/material'
import {useContext, useEffect, useRef, useState} from 'react'
import {TableContext} from './index.tsx'
import './style.sass'

function CellInput() {
  const injector = useContext(TableContext);
  const {cursor, setCursor, rows, columns} = injector;

  const [cell, setCell] = useState('');

  const textFieldRef = useRef<HTMLInputElement>(null);
  const autocompleteInputRef = useRef<HTMLInputElement>(null); // For Autocomplete's <TextField>

  const currentColumnConfig = columns[cursor.columnIndex];
  const currentRowData = rows[cursor.rowIndex];

  useEffect(() => {
    if (currentRowData && currentColumnConfig) {
      const defaultValue = currentRowData[currentColumnConfig.name];
      setCell(defaultValue || '');
    }

    if (cursor.isEditing) {
      setTimeout(() => { // setTimeout ensures DOM is updated and MUI components are ready
        const isDropdown = currentColumnConfig?.dropdown;
        const inputToFocus = isDropdown ? autocompleteInputRef.current : textFieldRef.current;

        if (inputToFocus) {
          inputToFocus.focus();
          // select text for TextField
          if (!isDropdown && typeof inputToFocus.select === 'function') {
            inputToFocus.select();
          }
        }
      }, 0);
    }
  }, [currentColumnConfig, currentRowData,
    cursor.columnIndex, cursor.rowIndex,
    cursor.isEditing]);

  const cursorBorderWidth = 2
  const style = {
    top: `${cursor?.top + cursorBorderWidth}px`,
    left: `${cursor?.left + cursorBorderWidth}px`,
    width: `${cursor?.width - cursorBorderWidth * 2}px`,
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let columnIndex = cursor.columnIndex;
      let rowIndex = cursor.rowIndex;

      if (columnIndex === columns.length - 1) {
        if (rowIndex < rows.length - 1) {
          columnIndex = 0;
          rowIndex += 1;
        } else {
          // Last cell
          setCursor({...cursor, isEditing: false}); // Exit editing mode
          (e.target as HTMLElement).blur();
          return;
        }
      } else {
        columnIndex += 1;
      }

      const nextCell = document.querySelector(`.cell-${rowIndex}-${columnIndex}`);

      if (nextCell) {
        // blur current input before moving to next cell
        (e.target as HTMLElement).blur();
        setCursor({
          ...cursor,
          columnIndex,
          rowIndex,
          top: nextCell.offsetTop,
          left: nextCell.offsetLeft,
          width: nextCell.offsetWidth,
          height: nextCell.offsetHeight,
          isEditing: true // make the new cell immediately editable
        })
        // The useEffect will handle focusing the input in the new cell
      }
    }
  }

  const onChange = (value) => {
    setCell(value);
    if (currentRowData && currentColumnConfig) {
      rows[cursor.rowIndex][currentColumnConfig.name] = value;
    }

  }

  if (!cursor.isEditing && !columns[cursor.columnIndex]) { // Guard against invalid cursor state initially
    return null;
  }

  return (
    <span style={style} className={`cell-input ${cursor.isEditing ? 'isEditing' : ''}`}>
      {
        columns[cursor.columnIndex].dropdown
          ? <Autocomplete
            fullWidth={true}
            disablePortal
            openOnFocus   // open dropdown when focused
            options={columns[cursor.columnIndex].items || []}
            value={currentColumnConfig.items?.find(item => item.name === cell) || null}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) =>
              <TextField {...params}
                         inputRef={autocompleteInputRef}
                         variant={'standard'}
                         sx={{
                           padding: 0,
                           '& .MuiOutlinedInput-root': {
                             '& fieldset': {
                               border: 'none'
                             },
                             '&:hover fieldset': {
                               border: 'none'
                             },
                             '&.Mui-focused fieldset': {
                               border: 'none'
                             },
                           },
                           '& .MuiOutlinedInput-input': {
                             padding: '4px'
                           },
                         }}
              />
            }
            onChange={(_event, newValue) => {
              onChange(newValue.name)
            }}
            onKeyDown={onKeyDown}
          />
          : <TextField
            inputRef={textFieldRef} // Assign ref
            autoComplete={'off'}
            fullWidth
            variant={'standard'}
            sx={{
              padding: 0,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none'
                },
                '&:hover fieldset': {
                  border: 'none'
                },
                '&.Mui-focused fieldset': {
                  border: 'none'
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: '4px'
              },
            }}
            value={cell}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
          />
      }
    </span>
  )
}

export default CellInput;