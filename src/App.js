import { Navigate, useRoutes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
//import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import TodosPage from './pages/TodosPage';

export default function App() {
  const mainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '*', element: <Navigate to='/404' /> },
      { path: '/', element: <HomePage /> },
      { path: 'users/:userId', element: <UserPage /> },
      { path: 'todos', element: <TodosPage /> },
      // { path: '404', element: <ErrorPage />},
    ],
  };
 
  const routing = useRoutes([mainRoutes]);
 
  return <>{routing}</>;
};