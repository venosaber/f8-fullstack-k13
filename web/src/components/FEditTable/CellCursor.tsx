import './style.sass'
import {useContext} from 'react'
import {TableContext} from './index.tsx'

export default function CellCursorComponent(){
  const injector = useContext(TableContext);
  const {cursor} = injector;

  return (
    <span
      className={'cursor'}
      style={{
        top: `${cursor.top}px`,
        left: `${cursor.left}px`,
        width: `${cursor.width}px`,
        height: `${cursor.height}px`
      }}
    />
  )
}