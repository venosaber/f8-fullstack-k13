import {TableContext} from "./index.tsx";
import {useContext} from 'react'

export default function(){
  const injector = useContext(TableContext);
  const {cursor} = injector;
  console.log('injector ',injector)

  return (
    <span className={'cursor'}
          style={{
            top: `${cursor.top}px`,
            left: `${cursor.left}px`,
            width: `${cursor.width}px`,
            height: `${cursor.height}px`
          }}
    >

    </span>
  )
}