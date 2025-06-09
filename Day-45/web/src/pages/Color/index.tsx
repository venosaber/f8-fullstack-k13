import {FTable, FHeader, ColorDialog, SearchBar} from '../../components'
import {Color, Header} from '../../utils'
import {Box} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, createColor, deleteColor, getColors, RootState, updateColor} from "../../store";

const headers: Header[] = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'action', text: ''}
]

export default () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [curColor, setCurColor] = useState<Color>({
    id: 0,
    name: ''
  })

  const {data: colors} = useSelector((state: RootState) => state.colors);
  const dispatch: AppDispatch = useDispatch();

  const onAdd = () => {
    setIsOpenDialog(true)
  }

  const onUpdate = useCallback((id: number) => {
    const currentColor: Color = colors.find((c: Color) => c.id === id)!;
    setCurColor({...currentColor})
    setIsOpenDialog(true)
  }, [colors])

  const onSave = async () => {
    setIsOpenDialog(false)

    if (curColor.id) {
      const newColor = {...toBody(), id: curColor.id}
      dispatch(updateColor(newColor))
    }
    else {
      const newColor = {...toBody(), id: 0}
      dispatch(createColor(newColor))
    }
  }

  const onDelete = useCallback((id: number)=>{
    dispatch(deleteColor(id))
  }, [dispatch])

  const toBody = () => {
    return {
      name: curColor.name
    }
  }

  useEffect(()=>{
    dispatch(getColors())
  },[dispatch])

  return (
    <>
      <FHeader title={'Colors'}/>
      <Box sx={{maxWidth: 500, margin: 'auto'}}>
        <SearchBar onAdd={onAdd}/>

        <FTable
          headers={headers}
          rows={colors}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
        <ColorDialog
          color={curColor}
          setColor={setCurColor}
          onSave={onSave}
          isOpen={isOpenDialog}
          onClose={() => setIsOpenDialog(false)}
        />
      </Box>
    </>
  )
}