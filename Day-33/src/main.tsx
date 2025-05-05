import { createRoot } from 'react-dom/client'

// import './index.css'
// import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Product, Employee, Color} from "./pages"

const router = createBrowserRouter([
  {
    path: '/products',
    element: <Product/>
  },
  {
    path: '/employees',
    element: <Employee/>
  },
  {
    path: '/colors',
    element: <Color/>
  }
]);

const root = document.getElementById('root');
createRoot(root!).render(
  <RouterProvider router={router} />
)


