import { createRoot } from 'react-dom/client'

// import './index.css'
// import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Product, Employee} from "./pages"

const router = createBrowserRouter([
  {
    path: '/product',
    element: <Product/>
  },
  {
    path: '/employee',
    element: <Employee/>
  }
]);

const root = document.getElementById('root');
createRoot(root!).render(
  <RouterProvider router={router} />
)


