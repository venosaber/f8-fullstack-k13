import {createRoot} from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import {RouterProvider} from "react-router-dom";
import router from "./router";

const root = document.getElementById('root');

createRoot(root!).render(
  <RouterProvider router={router}/>
)
