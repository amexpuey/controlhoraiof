import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/admin/AdminHeader";
import AppsGrid from "@/components/AppsGrid";
import { LogoutButton } from "@/components/LogoutButton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AdminCompanies() {
  const navigate = useNavigate();
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleAppClick = (app: any) => {
    navigate(`/admin/user-view/${app.id}`);
  };

  const filteredCompanies = useMemo(() => {
    if (!searchTerm) return companies;
    const term = searchTerm.toLowerCase();
    return companies.filter(
      (c) =>
        c.title?.toLowerCase().includes(term) ||
        c.description?.toLowerCase().includes(term)
    );
  }, [companies, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white p-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container py-12">
        <div className="relative mb-8">
          <div className="absolute right-0 top-0">
            <LogoutButton />
          </div>
          <AdminHeader />
        </div>

        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar aplicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <AppsGrid
          apps={filteredCompanies}
          onAppClick={handleAppClick}
          highlightedFeatures={[]}
        />
      </div>
    </div>
  );
}