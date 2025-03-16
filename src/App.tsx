
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

// Wrap components that need consistent layout
const WithLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <MainHeader />
    <div className="flex-grow">
      {children}
    </div>
    <Footer />
  </>
);

// Move router configuration outside component to prevent recreation
const router = createBrowserRouter([
  {
    path: "/",
    element: <WithLayout><Index /></WithLayout>,
  },
  {
    path: "/dashboard",
    element: <WithLayout><Dashboard /></WithLayout>,
  },
  {
    path: "/mejores-apps-control-horario/:slug",
    element: <WithLayout><UserView /></WithLayout>,
  },
  {
    path: "/mejores-apps-control-horario/comparar/:ids",
    element: <WithLayout><ComparisonPage /></WithLayout>,
  },
  {
    path: "/blog",
    element: <WithLayout><Blog /></WithLayout>,
  },
  {
    path: "/blog/:slug",
    element: <WithLayout><BlogPost /></WithLayout>,
  },
  {
    path: "*",
    element: <WithLayout><Index /></WithLayout>,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
