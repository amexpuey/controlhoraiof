import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import UserLogin from "@/pages/UserLogin";
import Verify from "@/pages/Verify";
import PasswordReset from "@/pages/PasswordReset";
import AdminCompanies from "@/pages/admin/Companies";
import Users from "@/pages/admin/Users";
import Dashboard from "@/pages/Dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import UserView from "@/pages/UserView";
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
    path: "/user-login",
    element: <UserLogin />,
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
    element: <Dashboard />,
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
  {
    path: "/admin/user-view/:id",
    element: (
      <ProtectedRoute>
        <UserView />
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