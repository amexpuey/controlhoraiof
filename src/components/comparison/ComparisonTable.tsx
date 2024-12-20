import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Company = Database["public"]["Tables"]["companies"]["Row"];

interface ComparisonTableProps {
  apps: Company[];
}

export default function ComparisonTable({ apps }: ComparisonTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-48">Características</TableHead>
            {apps.map((app) => (
              <TableHead key={app.id} className="text-center">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={app.logo_url}
                    alt={`${app.title} logo`}
                    className="w-12 h-12 rounded-lg object-contain"
                  />
                  <span className="font-bold">{app.title}</span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Tipo</TableCell>
            {apps.map((app) => (
              <TableCell key={app.id} className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  app.type === "premium" 
                    ? "bg-purple-100 text-purple-700"
                    : app.type === "freemium"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {app.type.charAt(0).toUpperCase() + app.type.slice(1)}
                </span>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Precio</TableCell>
            {apps.map((app) => (
              <TableCell key={app.id} className="text-center">
                {app.pricing_starting_price === 0 
                  ? "Gratis"
                  : `${app.pricing_starting_price}€/${app.pricing_billing_period}`}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Valoraciones</TableCell>
            {apps.map((app) => (
              <TableCell key={app.id} className="text-center">
                {app.votes} votos
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Características</TableCell>
            {apps.map((app) => (
              <TableCell key={app.id}>
                <ul className="list-disc list-inside">
                  {app.features?.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Enlace</TableCell>
            {apps.map((app) => (
              <TableCell key={app.id} className="text-center">
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  Visitar <ExternalLink className="w-4 h-4" />
                </a>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}