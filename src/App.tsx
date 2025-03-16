
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import UserView from "@/pages/UserView";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

// Wrapper component to generate a new ad key on route change
const RouteChangeHandler = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [adKey, setAdKey] = useState(Date.now());
  
  // Update adKey when location changes
  useEffect(() => {
    setAdKey(Date.now());
  }, [location]);
  
  // Add adKey to global window object for other components to access
  useEffect(() => {
    // @ts-ignore
    window.adKey = adKey;
  }, [adKey]);
  
  return <>{children}</>;
};

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
    path: "*",
    element: <Dashboard />,
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
