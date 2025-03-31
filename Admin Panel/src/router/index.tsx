import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import AuthenticateRoute from './AuthenticateRoute'; // Import your auth wrapper
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element:
            route.layout === 'blank' ? (
                <BlankLayout>{route.protected ? <AuthenticateRoute element={route.element} /> : route.element}</BlankLayout>
            ) : (
                <DefaultLayout>{route.protected ? <AuthenticateRoute element={route.element} /> : route.element}</DefaultLayout>
            ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
