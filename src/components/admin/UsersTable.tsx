import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  company_size: string | null;
  onboarding_status: string;
  created_at: string;
  has_full_access: boolean;
  referred_by: string | null;
  selected_features: string[] | null;
}

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Company Size</TableHead>
            <TableHead>Selected Features</TableHead>
            <TableHead>Onboarding Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Referral Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.company_size || "Not specified"}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {user.selected_features?.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  )) || "No features selected"}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.onboarding_status === "completed" ? "default" : "secondary"}
                >
                  {user.onboarding_status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(user.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {user.has_full_access ? (
                  <Badge variant="default">Full Access</Badge>
                ) : user.referred_by ? (
                  <Badge variant="secondary">Referred User</Badge>
                ) : (
                  <Badge variant="outline">No Referral</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}