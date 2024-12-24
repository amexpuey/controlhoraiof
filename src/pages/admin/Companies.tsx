import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/admin/AdminHeader";
import AppsGrid from "@/components/AppsGrid";
import { LogoutButton } from "@/components/LogoutButton";

export default function AdminCompanies() {
  const navigate = useNavigate();
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

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
        
        <AppsGrid
          apps={companies}
          onAppClick={handleAppClick}
          highlightedFeatures={[]}
        />
      </div>
    </div>
  );
}