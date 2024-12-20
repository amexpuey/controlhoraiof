import { useParams } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import { useArticle } from "@/hooks/useArticles";
import ArticleEditor from "./ArticleEditor";

const AdminBlogPost = () => {
  const { id } = useParams();
  const { data: article, isLoading } = useArticle(id || "");

  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">
          {id === 'new' ? 'Create New Article' : 'Edit Article'}
        </h1>
        {isLoading ? (
          <p>Loading article...</p>
        ) : (
          <ArticleEditor article={article} />
        )}
      </div>
    </div>
  );
};

export default AdminBlogPost;