import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./themes/theme.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

// นำเข้าหน้าต่างๆ
import LoginPage from "./auth/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import History from "./pages/History.jsx";
import CreateMaster from "./pages/CreateMaster.jsx";
import ListNameMaster from "./pages/ListNameMaster.jsx";
import ManageMaster from "./pages/ManageMaster.jsx";
import LoseWinProvider from "./pages/LoseWinProvider.jsx";
import BillingReport from "./pages/BillingReport.jsx";

// เพิ่ม component ใหม่สำหรับป้องกันหน้า login
const RedirectIfAuthenticated = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children;
};

const protectedRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "history",
    element: <History />,
  },
  {
    path: "list-master",
    element: <ListNameMaster />,
  },
  {
    path: "manage-master",
    element: <ManageMaster />,
  },
  {
    path: "create-master",
    element: <CreateMaster />,
  },

  {
    path: "reports",
    children: [
      {
        path: "lose-win-provider",
        element: <LoseWinProvider />,
      },
      {
        path: "billing",
        element: <BillingReport />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <LoginPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: protectedRoutes,
  },
  {
    path: "/",
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/app/dashboard" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
