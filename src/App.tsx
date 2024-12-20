import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Verify from "@/pages/Verify";
import PasswordReset from "@/pages/PasswordReset";
import AdminBlog from "@/pages/admin/Blog";
import AdminBlogPost from "@/pages/admin/BlogPost";
import AdminCompanies from "@/pages/admin/Companies";
import Blog from "@/pages/Blog";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/blog",
    element: <Blog />,
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
    path: "/admin/blog",
    element: (
      <ProtectedRoute>
        <AdminBlog />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/blog/:id",
    element: (
      <ProtectedRoute>
        <AdminBlogPost />
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