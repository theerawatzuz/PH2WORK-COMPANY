import React from 'react'
import ReactDOM from 'react-dom'
import MainPage from './pages/MainPage.jsx'
import Resultreport from './pages/ResultReport.jsx'
import theme from './themes/theme.jsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './auth/LoginPage.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
      )
    },
    {
      path: '/resultreport',
      element: (
        <ThemeProvider theme={theme}>
          <Resultreport />
        </ThemeProvider>
      )
    },
    {
      path: '/login',
      element: (
        <ThemeProvider theme={theme}>
          <LoginPage />
        </ThemeProvider>
      )
    },
  ]
)

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);