import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Lead {
  id: number;
  email: string;
  nombre: string | null;
  empresa: string | null;
  plantilla_slug: string | null;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
}

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
}

export function LeadsTable({ leads, isLoading }: LeadsTableProps) {
  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Cargando leads...</div>;
  }

  if (leads.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No se encontraron leads</div>;
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Plantilla</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>UTM Source</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.email}</TableCell>
              <TableCell>{lead.nombre || "—"}</TableCell>
              <TableCell>{lead.empresa || "—"}</TableCell>
              <TableCell>
                {lead.plantilla_slug ? (
                  <Badge variant="secondary">{lead.plantilla_slug}</Badge>
                ) : "—"}
              </TableCell>
              <TableCell>{lead.source || "—"}</TableCell>
              <TableCell>{lead.utm_source || "—"}</TableCell>
              <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                {new Date(lead.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
