import {createBrowserRouter} from 'react-router-dom';
import {Classes, ClassDetail, Login, Register} from '../pages';

const router = createBrowserRouter([
    {
        path: '/classes',
        element: <Classes/>
    },
    {
        path: '/class/:id/*',
        element: <ClassDetail/>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
]);

export default router;