import AdminHeader from "@/components/admin/AdminHeader";
import { useCompanies } from "@/hooks/useCompanies";
import CsvUpload from "@/components/admin/CsvUpload";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const AdminCompanies = () => {
  const { data: companies, isLoading } = useCompanies();
  const navigate = useNavigate();

  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Apps Management</h1>
        </div>

        <div className="mb-8">
          <CsvUpload />
        </div>

        {isLoading ? (
          <p>Loading apps...</p>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies?.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.title}</TableCell>
                    <TableCell>{company.type}</TableCell>
                    <TableCell>
                      <Badge variant={company.verified ? "default" : "secondary"}>
                        {company.verified ? "Verified" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/app/${company.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
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

export default AdminCompanies;