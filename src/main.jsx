import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './themes/theme.jsx';
import MainPage from './pages/MainPage.jsx';
import Resultreport from './pages/ResultReport.jsx';
import LoginPage from './auth/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'main',
        element: <MainPage />
      },
      {
        path: 'resultreport',
        element: <Resultreport />
      },
      // เพิ่มเส้นทางอื่นๆ ที่ต้องการการป้องกันที่นี่
    ]
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);