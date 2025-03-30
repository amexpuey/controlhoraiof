
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
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
        <Route path="/admin/apps/:appId" element={<AdminAppEdit />} />
        <Route path="/admin/apps/create" element={<AdminAppCreate />} />
        <Route path="/admin/import-blog-posts" element={<ImportBlogPosts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
