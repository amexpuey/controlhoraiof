import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface LeadsTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  slugFilter: string;
  onSlugFilterChange: (value: string) => void;
  slugOptions: string[];
  onDownload: () => void;
  totalCount: number;
}

export function LeadsTableHeader({
  searchTerm,
  onSearchChange,
  slugFilter,
  onSlugFilterChange,
  slugOptions,
  onDownload,
  totalCount,
}: LeadsTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por email, nombre o empresa..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={slugFilter} onValueChange={onSlugFilterChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Todas las plantillas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las plantillas</SelectItem>
            {slugOptions.map((slug) => (
              <SelectItem key={slug} value={slug}>{slug}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge variant="outline" className="whitespace-nowrap">
          {totalCount} leads
        </Badge>
      </div>
      <Button onClick={onDownload} variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Descargar CSV
      </Button>
    </div>
  );
}
