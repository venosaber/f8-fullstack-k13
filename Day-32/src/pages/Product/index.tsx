import {Header, Product} from "../../utils"
import {useState} from "react";
import {FTable, ProductDialog} from "../../components";
import {Button} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const headers: Array<Header> = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'shortName',text: 'Viet tat'},
  {name: 'code', text: 'Ma san pham'},
  {name: 'importPrice', text: 'Gia nhap khau'},
  {name: 'price', text: 'Gia ban'},
  {name: 'remaining', text: 'Ton kho'},
  {name: 'expDate', text: 'Han su dung'},
  {name: 'desc', text: 'Mo ta'},
  {name: 'color', text: 'Mau sac'},
  {name: 'unit', text: 'Don vi'},
  {name: 'action', text: ''}
];

export default () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Array<Product>>([
    {id: 1, name: 'Havana xls', shortName: 'Havana', code: 'A12', importPrice: 100000, price: 120000, remaining: 100, expDate: '2023-01-01', desc: 'Havana xls', color: 'red', unit: 'kg'},
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
    if (isNew) { // add a new product
      const id = products[products.length - 1]?.id + 1 || 1; // if products[] is empty => new id is 1
      const {name, shortName, code, importPrice, price, remaining, expDate, desc, color, unit} = product;
      const newProduct = {id, name, shortName, code, importPrice, price, remaining, expDate, desc, color, unit };
      setProducts(products => [...products, newProduct]);
    } else {  // editing a product
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
      <ProductDialog title={isNew ? "Add New Product" : "Edit Product Information"}
                      isOpen={isDialogOpen} isNew={isNew}
                      onSave={onSave} onClose={() => setIsDialogOpen(false)}
                      dialogProduct={dialogProduct}
                      key={isNew ? Date.now() : dialogProduct?.id}
        // add a new product -> key = Date.now() to force remount
        // edit an existing product -> key = dialogProduct.id
      />
    </>
  )
}