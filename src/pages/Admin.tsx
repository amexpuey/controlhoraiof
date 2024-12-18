import { useNavigate } from "react-router-dom";
import { useCompanies } from "@/hooks/useCompanies";
import AppCard from "@/components/AppCard";
import CsvUpload from "@/components/admin/CsvUpload";

export default function Admin() {
  const navigate = useNavigate();
  const { data: companies, isLoading } = useCompanies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <div className="mb-8">
        <CsvUpload />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies?.map((company) => (
          <AppCard
            key={company.id}
            app={company}
            onClick={() => navigate(`/admin/${company.id}`)}
          />
        ))}
      </div>
    </div>
  );
}