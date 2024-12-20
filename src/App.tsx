import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Verify from "@/pages/Verify";
import Dashboard from "@/pages/Dashboard";
import UserView from "@/pages/UserView";
import ComparisonPage from "@/pages/ComparisonPage";
import AdminBlog from "@/pages/admin/AdminBlog";
import ArticleEditor from "@/pages/admin/ArticleEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/user-view/:id" element={<UserView />} />
        <Route path="/admin/compare/:appIds" element={<ComparisonPage />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/blog/new" element={<ArticleEditor />} />
        <Route path="/admin/blog/edit/:id" element={<ArticleEditor />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;