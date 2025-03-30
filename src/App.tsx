import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Admin from "@/pages/Admin";
import Apps from "@/pages/Apps";
import AppDetails from "@/pages/AppDetails";
import Legal from "@/pages/Legal";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Features from "@/pages/Features";
import Integrations from "@/pages/Integrations";
import Affiliates from "@/pages/Affiliates";
import Changelog from "@/pages/Changelog";
import ComingSoon from "@/pages/ComingSoon";
import AdminAppEdit from "@/pages/AdminAppEdit";
import AdminAppCreate from "@/pages/AdminAppCreate";
import ImportBlogPosts from "@/pages/admin/ImportBlogPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/:slug" element={<AppDetails />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/admin/apps/:appId" element={<AdminAppEdit />} />
        <Route path="/admin/apps/create" element={<AdminAppCreate />} />
        <Route path="/admin/import-blog-posts" element={<ImportBlogPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
