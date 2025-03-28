
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import UserView from "@/pages/UserView";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ComplianceCheckerPage from "@/pages/ComplianceCheckerPage";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Define which routes should hide the footer
const routesWithoutFooter = ["/compliance-checker"];

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
    path: "/compliance-checker",
    element: (
      <>
        <ComplianceCheckerPage />
      </>
    ),
  },
  {
    path: "*",
    element: <Dashboard />,
  },
]);

// Instead of using useLocation inside AppContent, we'll modify our router configuration
// to determine which routes should render the Footer
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      {/* Render Footer normally - it will not be rendered on compliance-checker route */}
      {window.location.pathname !== "/compliance-checker" && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
