import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminBlog = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Articles</h1>
        <Button onClick={() => navigate('/admin/blog/new')}>
          Create New Article
        </Button>
      </div>
      <div className="grid gap-4">
        {/* Article list will be implemented later */}
        <p>Blog management coming soon...</p>
      </div>
    </div>
  );
};

export default AdminBlog;