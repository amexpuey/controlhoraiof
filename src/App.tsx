import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import UserView from "@/pages/UserView";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/mejores-apps-control-horario/:slug",
    element: <UserView />,
  },
  {
    path: "*",
    element: <Dashboard />,
  }
], {
  basename: import.meta.env.BASE_URL || '/',
});

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;