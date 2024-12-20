import { useParams } from "react-router-dom";

const AdminBlogPost = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        {id === 'new' ? 'Create New Article' : 'Edit Article'}
      </h1>
      <div>
        {/* Article editor will be implemented later */}
        <p>Article editor coming soon...</p>
      </div>
    </div>
  );
};

export default AdminBlogPost;