import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Verify from "@/pages/Verify";
import PasswordReset from "@/pages/PasswordReset";
import AdminCompanies from "@/pages/admin/Companies";
import Users from "@/pages/admin/Users";
import Dashboard from "@/pages/Dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/password-reset",
    element: <PasswordReset />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <AdminCompanies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/compare/:ids",
    element: (
      <ProtectedRoute>
        <ComparisonPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;