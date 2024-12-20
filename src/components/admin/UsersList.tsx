import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function UsersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      console.log("Fetching profiles...");
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching profiles:", error);
        throw error;
      }
      
      console.log("Fetched profiles:", data);
      return data || [];
    },
  });

  const migrateUsers = useMutation({
    mutationFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.access_token) throw new Error("No access token");

      // Call our Edge Function to get auth users
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-list-users`,
        {
          headers: {
            Authorization: `Bearer ${session.session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch users');
      }

      const { users: authUsers } = await response.json();
      console.log("Auth users found:", authUsers.length);

      // For each auth user, ensure they have a profile
      const promises = authUsers.map(async (user) => {
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!existingProfile) {
          return supabase
            .from("profiles")
            .insert({
              id: user.id,
              email: user.email,
              is_email_verified: user.email_confirmed_at !== null,
              onboarding_status: "in_progress"
            });
        }
        return null;
      });

      await Promise.all(promises);
      return authUsers.length;
    },
    onSuccess: (count) => {
      toast.success(`Successfully migrated ${count} users`);
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error("Migration error:", error);
      toast.error("Failed to migrate users. Please check console for details.");
    },
  });

  const filteredUsers = users?.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCsv = () => {
    if (!users) return;

    const csvContent = [
      ["Email", "Company Size", "Onboarding Status", "Created At", "Referral Code", "Referred By"],
      ...users.map((user) => [
        user.email,
        user.company_size || "Not specified",
        user.onboarding_status,
        format(new Date(user.created_at), "yyyy-MM-dd HH:mm:ss"),
        user.referral_code || "No referral code",
        user.referred_by || "Not referred"
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error in UsersList:", error);
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => migrateUsers.mutate()}
            disabled={migrateUsers.isPending}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Migrate Users
          </Button>
          <Button onClick={downloadCsv}>
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Company Size</TableHead>
              <TableHead>Onboarding Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Referral Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company_size || "Not specified"}</TableCell>
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
    </div>
  );
}