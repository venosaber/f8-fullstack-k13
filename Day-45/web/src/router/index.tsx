import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
// import Employee from '../pages/Employee'
// import Order from '../pages/Order'
// import OrderDetail from '../pages/Order/details'
import Color from '../pages/Color'
import Customer from '../pages/Customer'

const router = createBrowserRouter([
  // {
  //   path: "/order",
  //   element: <Order/>,
  // },
  // {
  //   path: "/order/:id",
  //   element: <OrderDetail/>,
  // },
  {
    path: "/color",
    element: <Color/>,
  },
  {
    path: "/customer",
    element: <Customer/>,
  },
  {
    path: "/product",
    element: <Product/>,
  },
  // {
  //   path: "/employee",
  //   element: <Employee/>,
  // },
]);

export default router