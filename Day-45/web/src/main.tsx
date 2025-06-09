// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./router"
import store from './store'
import {Provider} from 'react-redux'

import {RouterProvider} from "react-router";


const root = document.getElementById("root");

createRoot(root!).render(
  <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </>
)
