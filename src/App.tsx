
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import UserView from "@/pages/UserView";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import MainHeader from "@/components/MainHeader";

// Wrap components that need consistent layout
const WithLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <MainHeader />
    {children}
  </>
);

// Move router configuration outside component to prevent recreation
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
    path: "/mejores-apps-control-horario/comparar/:ids",
    element: <ComparisonPage />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "*",
    element: <Index />,
  },
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
