import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/admin/AdminHeader";
import { useArticles } from "@/hooks/useArticles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const AdminBlog = () => {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useArticles();

  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Articles</h1>
          <Button onClick={() => navigate('/admin/blog/new')}>
            Create New Article
          </Button>
        </div>

        {isLoading ? (
          <p>Loading articles...</p>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles?.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.category}</TableCell>
                    <TableCell>
                      <Badge variant={article.status === "published" ? "default" : "secondary"}>
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(article.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/blog/${article.id}`)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;