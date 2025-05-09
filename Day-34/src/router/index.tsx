import {createBrowserRouter} from 'react-router-dom'
import {Class, ClassDetail} from '../pages'

const router = createBrowserRouter([
  {
    path: '/classes',
    element: <Class/>
  },
  {
    path: '/class/:id',
    element: <ClassDetail/>
  }
])

export default router;