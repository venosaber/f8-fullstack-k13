import {Header, Color} from "../../utils"
import {useEffect, useState} from "react";
import {FTable, ColorDialog} from "../../components";
import {Button} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import api from "../../plugins/api.ts";

const headers: Array<Header> = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'action', text: ''}
];

export default () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [colors, setColors] = useState<Array<Color>>([]);

  // information of the color that would be shown on the dialog
  const [dialogColor, setDialogColor] = useState<Color | undefined>(undefined);
  // check if the dialog is open to add a new color or to edit an existing color
  const [isNew, setIsNew] = useState<boolean>(false);

  const getData = async () => {
    try {
      const colorsData = await api.get('/colors/');
      setColors(colorsData.data);
    } catch (e) {
      console.error(e);
    }
  }

  const postData = async (color: Color) => {
    try {
      const response = await api.post('/colors/', color);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  const putData = async (color: Color) => {
    try {
      const response = await api.put(`/colors/${color.id}`, color);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  const deleteData = async (id: string) => {
    try {
      await api.delete(`/colors/${id}`);
    } catch (e) {
      throw e;
    }
  }

  // onMounted
  useEffect(() => {
    getData();
  }, []);

  const onAdd = () => {
    setIsNew(true);
    setDialogColor(undefined); // there should be no information on the dialog yet
    setIsDialogOpen(true);
  }

  const onEdit = (color: Color) => {
    setIsNew(false);
    setDialogColor(color); // the default information on the dialog is of this color
    setIsDialogOpen(true);
  }

  const onSave = async (color: Color, isNew: boolean) => {
    setIsDialogOpen(false);

    if (isNew) { // add a new color
      // Optimistic UI update
      const id = String(Number(colors[colors.length - 1]?.id) + 1 || 1); // if colors[] is empty => new id is 1
      const newColor = {...color, id};
      setColors(colors => [...colors, newColor]);

      // Update to server
      try{
        const addedColor = await postData(newColor);
        console.log('Color added successfully: ', addedColor);
      }catch (e){ // rollback
        setColors(colors => colors.filter(color => color.id !== id));
        console.error('Error adding color: ', e);
      }

    } else {  // editing a color
      // Optimistic UI update
      const replacedColor: Color = colors.find(c => c.id === color.id)!;
      setColors(colors => colors.map(c => c.id === color.id ? color : c));

      // Update to server
      try{
        const updatedColor = await putData(color);
        console.log('Color updated successfully: ', updatedColor);
      }catch (e){ // rollback
        setColors(colors => colors.map(c => c.id === color.id ? replacedColor : c)); // rollback
        console.error('Error updating color: ', e);
      }
    }
  }

  const onDelete = async (id: string) => {
    // Delete - Optimistic UI update
    const deleteIndex: number = colors.findIndex(color => color.id === id);
    const deletedColor = colors[deleteIndex];
    const newColors = [...colors].filter(color => color.id !== id);
    setColors(newColors);

    // Update to server
    try{
      await deleteData(id);
      console.log('Color deleted successfully: ', deletedColor);
    }catch (e){ // rollback
      newColors.splice(deleteIndex, 0, deletedColor);
      setColors(newColors);
      console.error('Error deleting color: ', e);
    }
  }

  return (
    <>
      <h1>Color page</h1>
      <Button variant="outlined" onClick={onAdd}>Add Color</Button>
      <FTable tableName="Colors hoho" headers={headers} rows={colors} onEdit={onEdit} onDelete={onDelete} width={600}/>
      <ColorDialog title={isNew ? "Add New Color" : "Edit Color Information"}
                      isOpen={isDialogOpen} isNew={isNew}
                      onSave={onSave} onClose={() => setIsDialogOpen(false)}
                      dialogColor={dialogColor}
                      key={isNew ? Date.now() : dialogColor?.id}
        // add a new color -> key = Date.now() to force remount
        // edit an existing color -> key = dialogColor.id
      />
    </>
  )

}