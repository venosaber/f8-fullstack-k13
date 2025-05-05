import {Color, Header, Product} from "../../utils"
import {useEffect, useState} from "react";
import {FTable, ProductDialog} from "../../components";
import {Button} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import api from "../../plugins/api";

const headers: Array<Header> = [
  {name: 'id', text: 'ID'},
  {name: 'name', text: 'Ten'},
  {name: 'shortName',text: 'Ten ngan'},
  {name: 'code', text: 'Code'},
  {name: 'expectedPrice', text: 'Gia de xuat'},
  {name: 'description', text: 'Mo ta'},
  {name: 'color', text: 'Mau sac'},
  {name: 'action', text: ''}
];

export default () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Array<Product>>([]);

  // information of the product that would be shown on the dialog
  const [dialogProduct, setDialogProduct] = useState<Product | undefined>(undefined);
  // check if the dialog is open to add a new product or to edit an existing product
  const [isNew, setIsNew] = useState<boolean>(false);

  const [colorOptions, setColorOptions] = useState<Array<Color>>([]);

  const groupData = (products: Array<Product>, colors: Array<Color>) => {
    // hash table (color)
    const colorObj: {[id: string]: string} = {};
    colors.forEach((color: Color) => {
      colorObj[color.id] = color.name;
    });

    // join colors to products
    products.forEach((product: Product) => {
      product.color = colorObj[product.color]
    });
    setProducts([...products]);
  }

  const getData = async () => {
    try{
      const [productsData, colorsData] = await Promise.all(
        [api.get('/products/'), api.get('/colors/')]
      );

      // group data
      groupData(productsData.data, colorsData.data);

      // prop colorOptions
      setColorOptions(colorsData.data);
    }catch (e){
      console.error(e);
    }
  }

  const postData = async (product: Product) => {
    try{
      const response = await api.post('/products/', product);
      return response.data;
    }catch (e){
      throw e;
    }
  }

  const putData = async (product: Product) => {
    try{
      const response = await api.put(`/products/${product.id}`, product);
      return response.data;
    }catch (e){
      throw e;
    }
  }

  const deleteData = async (id: string) => {
    try{
      await api.delete(`/products/${id}`);
    }catch (e){
      throw e;
    }
  }

  // onMounted
  useEffect(() => {
    getData();
  },[]);

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

  const onSave = async (product: Product, isNew: boolean) => {
    setIsDialogOpen(false);

    const colorId = String(product.color);
    const colorName = colorOptions.find((c) => c.id === colorId)?.name || colorId;
    const productForState = {...product, color: colorName};

    if (isNew) { // add a new product
      // Post - Optimistic UI update
      const id = String(Number(products[products.length - 1]?.id) + 1 || 1); // if products[] is empty => new id is 1
      const newProductForState = {...productForState, id};
      setProducts(products => [...products, newProductForState]);

      // Update to server
      try{
        const addedProduct = await postData({...product, id});
        console.log('Product added successfully: ', addedProduct);
      }catch (e){ // rollback
        setProducts(products => products.filter(p => p.id !== id));
        console.error('Error adding product: ', e);
      }

    } else {  // editing a product
      // Put - Optimistic UI update
      const replacedProduct: Product = products.find(p => p.id === product.id)!;
      setProducts(products => products.map(p => p.id === product.id ? productForState : p));

      // Update to server
      try{
        const updatedProduct = await putData(product);
        console.log('Product updated successfully: ', updatedProduct);
      }catch (e){ // rollback
        setProducts(products => products.map(p => p.id === product.id ? replacedProduct : p)); // rollback
        console.error('Error updating product: ', e);
      }
    }
  }

  const onDelete = async (id: string) => {
    // Delete - Optimistic UI update
    const deleteIndex: number = products.findIndex(p => p.id === id);
    const deletedProduct = products[deleteIndex];
    const newProducts = [...products].filter(p => p.id !== id);
    setProducts(newProducts);

    // Update to server
    try{
      await deleteData(id);
      console.log('Product deleted successfully: ', deletedProduct);
    }catch (e){ // rollback
      newProducts.splice(deleteIndex, 0, deletedProduct);
      setProducts(newProducts);
      console.error('Error deleting product: ', e);
    }
  }

  return (
    <>
      <h1>Product page</h1>
      <Button variant="outlined" onClick={onAdd}>Add Product</Button>
      <FTable tableName="Products hihi" headers={headers} rows={products} onEdit={onEdit} onDelete={onDelete} width={1400}/>
      <ProductDialog title={isNew ? "Add New Product" : "Edit Product Information"}
                      isOpen={isDialogOpen} isNew={isNew}
                      onSave={onSave} onClose={() => setIsDialogOpen(false)}
                      dialogProduct={dialogProduct}
                      colorOptions={colorOptions}
                      key={isNew ? Date.now() : dialogProduct?.id}
        // add a new product -> key = Date.now() to force remount
        // edit an existing product -> key = dialogProduct.id
      />
    </>
  )
}