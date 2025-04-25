import {Header, Product} from "../../utils"
import {useState} from "react";
import {DialogContainer, FTable} from "../../components";
import {Button} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const headers: Array<Header> = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'type', text: 'Kieu'},
  {name: 'origin', text: 'Xuat xu'},
  {name: 'action', text: ''}
]

export default () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Array<Product>>([
    {id: 1, name: 'Hang 1', type: '1', origin: 'Trung Quoc'}
  ]);

  // information of the product that would be shown on the dialog
  const [dialogProduct, setDialogProduct] = useState<Product | undefined>(undefined);
  // check if the dialog is open to add a new product or to edit an existing product
  const [isNew, setIsNew] = useState<boolean>(false);

  const onAdd = () => {
    setIsNew(true);
    setDialogProduct(undefined); // there should be no information on the dialog yet
    setIsDialogOpen(true);
  }

  const onEdit = (product: Product) => {
    setIsNew(false);
    setDialogProduct(product); // the default information on the dialog is of this product
    setIsDialogOpen(true);
  }

  const onSave = (product: Product, isNew: boolean) => {
    setIsDialogOpen(false);
    if(isNew){ // add a new product
      const id = products[products.length - 1]?.id + 1 || 1; // if products[] is empty => new id is 1
      const {name, type, origin} = product;
      const newProduct = {id, name, type, origin};
      setProducts(products => [...products, newProduct]);
    }else{  // editing a product
      setProducts(currentProducts => currentProducts.map(
        currentProduct => currentProduct.id === product.id ? product : currentProduct // replace
      ));
    }
  }

  const onDelete = (id: number) => {
    setProducts(products => products.filter(product => product.id !== id));
  }

  return (
    <>
      <h1>Product page</h1>
      <Button variant="outlined" onClick={onAdd}>Add Product</Button>
      <FTable tableName="Products" headers={headers} rows={products} onEdit={onEdit} onDelete={onDelete}/>
      <DialogContainer width={650} isOpen={isDialogOpen} dialogProduct={dialogProduct}
                       isNew={isNew} onSave={onSave} onClose={() => {setIsDialogOpen(false)}}
                       key = {isNew ? Date.now() : dialogProduct?.id}
                       // add a new product -> key = Date.now() to force remount
                       // edit an existing product -> key = dialogProduct.id
      />
    </>
  )
}