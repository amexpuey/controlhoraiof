
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import ComparisonPage from "@/pages/ComparisonPage";
import UserView from "@/pages/UserView";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ComplianceCheckerPage from "@/pages/ComplianceCheckerPage";
import Templates from "@/pages/Templates";
import TemplateLandingPage from "@/pages/TemplateLandingPage";
import TalentGuidePage from "@/pages/TalentGuidePage";
import TimecardPage from "@/pages/TimecardPage";
import DirectoryPage from "@/pages/DirectoryPage";
import SolutionPage from "@/pages/SolutionPage";
import VsComparisonPage from "@/pages/VsComparisonPage";
import BlogCategoryPage from "@/pages/BlogCategoryPage";
import AdminCompanies from "@/pages/admin/Companies";
import AdminUsers from "@/pages/admin/Users";
import AdminLeads from "@/pages/admin/Leads";
import AdminArticles from "@/pages/admin/Articles";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/directorio", element: <DirectoryPage /> },
  { path: "/dashboard", element: <DirectoryPage /> },
  { path: "/mejores-apps-control-horario", element: <DirectoryPage /> },
  { path: "/directorio/:slug", element: <SolutionPage /> },
  { path: "/comparar/:slugs", element: <VsComparisonPage /> },
  { path: "/mejores-apps-control-horario/:slug", element: <UserView /> },
  { path: "/mejores-apps-control-horario/comparar/:ids", element: <ComparisonPage /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/blog/categoria/:category", element: <BlogCategoryPage /> },
  { path: "/compliance-checker", element: <ComplianceCheckerPage /> },
  { path: "/plantillas", element: <Templates /> },
  { path: "/plantillas/guia-talento", element: <TalentGuidePage /> },
  { path: "/plantillas/registro-horas", element: <TimecardPage /> },
  { path: "/plantillas/:slug", element: <TemplateLandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/admin/companies", element: <ProtectedRoute><AdminCompanies /></ProtectedRoute> },
  { path: "/admin/users", element: <ProtectedRoute><AdminUsers /></ProtectedRoute> },
  { path: "/admin/leads", element: <ProtectedRoute><AdminLeads /></ProtectedRoute> },
  { path: "/admin/articles", element: <ProtectedRoute><AdminArticles /></ProtectedRoute> },
  { path: "*", element: <DirectoryPage /> },
]);

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
