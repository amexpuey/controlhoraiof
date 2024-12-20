import { Search, UserPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UsersTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onMigrate: () => void;
  onDownload: () => void;
  isMigrating: boolean;
}

export function UsersTableHeader({
  searchTerm,
  onSearchChange,
  onMigrate,
  onDownload,
  isMigrating
}: UsersTableHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={onMigrate}
          disabled={isMigrating}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Migrate Users
        </Button>
        <Button onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>
    </div>
  );
}