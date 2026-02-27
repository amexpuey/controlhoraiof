import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/admin/AdminHeader";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LeadsTableHeader } from "@/components/admin/LeadsTableHeader";

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [slugFilter, setSlugFilter] = useState("all");

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plantilla_leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const slugOptions = useMemo(() => {
    const slugs = new Set(leads.map((l) => l.plantilla_slug).filter(Boolean) as string[]);
    return Array.from(slugs).sort();
  }, [leads]);

  const filtered = useMemo(() => {
    let result = leads;
    if (slugFilter !== "all") {
      result = result.filter((l) => l.plantilla_slug === slugFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (l) =>
          l.email?.toLowerCase().includes(term) ||
          l.nombre?.toLowerCase().includes(term) ||
          l.empresa?.toLowerCase().includes(term)
      );
    }
    return result;
  }, [leads, slugFilter, searchTerm]);

  const handleDownload = () => {
    const headers = ["Email", "Nombre", "Empresa", "Plantilla", "Source", "UTM Source", "UTM Medium", "UTM Campaign", "Fecha"];
    const rows = filtered.map((l) => [
      l.email, l.nombre || "", l.empresa || "", l.plantilla_slug || "",
      l.source || "", l.utm_source || "", l.utm_medium || "", l.utm_campaign || "",
      new Date(l.created_at).toISOString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Leads de Plantillas</h1>
        <div className="space-y-4">
          <LeadsTableHeader
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            slugFilter={slugFilter}
            onSlugFilterChange={setSlugFilter}
            slugOptions={slugOptions}
            onDownload={handleDownload}
            totalCount={filtered.length}
          />
          <LeadsTable leads={filtered} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
