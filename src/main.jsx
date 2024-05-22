import React from 'react'
import ReactDOM from 'react-dom'
import Report from './pages/Report.jsx'
import Resultreport from './pages/ResultReport.jsx'
import theme from './themes/theme.jsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ThemeProvider theme={theme}>
          <Report />
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
  ]
)

ReactDOM.render(
  <RouterProvider router={router}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Report />
      </ThemeProvider>
    </React.StrictMode>
  </RouterProvider>,
  document.getElementById('root')
);
