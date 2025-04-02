
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ComparisonPage from "@/pages/ComparisonPage";
import UserView from "@/pages/UserView";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ComplianceCheckerPage from "@/pages/ComplianceCheckerPage";
import Templates from "@/pages/Templates";
import TalentGuidePage from "@/pages/TalentGuidePage";
import ComplianceKit from "@/pages/ComplianceKit";
import LearningModulePage from "@/pages/LearningModulePage";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Define which routes should hide the footer
const routesWithoutFooter = [
  "/compliance-checker", 
  "/kit-legal",
  "/kit-legal/modulo/que-es-control-horario",
  "/kit-legal/modulo/es-obligatorio",
  "/kit-legal/modulo/como-implementar"
];

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
    element: <ComplianceCheckerPage />,
  },
  {
    path: "/plantillas",
    element: <Templates />,
  },
  {
    path: "/plantillas/guia-talento",
    element: <TalentGuidePage />,
  },
  {
    path: "/kit-legal",
    element: <ComplianceKit />,
  },
  {
    path: "/kit-legal/modulo/:moduleId",
    element: <LearningModulePage />,
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
      {/* Render Footer based on current path */}
      {!routesWithoutFooter.includes(window.location.pathname) && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
