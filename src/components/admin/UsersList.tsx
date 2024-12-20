import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";
import { UsersTableHeader } from "./UsersTableHeader";
import { UsersTable } from "./UsersTable";

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

  const downloadCsv = () => {
    if (!users) return;

    const csvContent = [
      ["Email", "Company Size", "Selected Features", "Onboarding Status", "Created At", "Referral Code", "Referred By"],
      ...users.map((user) => [
        user.email,
        user.company_size || "Not specified",
        user.selected_features?.join(", ") || "None",
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

  const migrateUsers = useMutation({
    mutationFn: async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.access_token) {
          throw new Error("No access token");
        }

        console.log("Starting user migration...");
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-list-users`,
          {
            headers: {
              Authorization: `Bearer ${session.session.access_token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
          console.error("Error response from admin-list-users:", errorData);
          throw new Error(errorData.error || 'Failed to fetch users');
        }

        const responseData = await response.json().catch(() => {
          console.error("Failed to parse response as JSON");
          throw new Error('Invalid JSON response from server');
        });

        if (!responseData || !Array.isArray(responseData.users)) {
          console.error("Invalid response format:", responseData);
          throw new Error('Invalid response format from admin-list-users');
        }

        const authUsers = responseData.users;
        console.log("Auth users found:", authUsers.length);

        // Process users in batches to avoid overwhelming the database
        const batchSize = 10;
        for (let i = 0; i < authUsers.length; i += batchSize) {
          const batch = authUsers.slice(i, i + batchSize);
          const promises = batch.map(async (user) => {
            const { data: existingProfile } = await supabase
              .from("profiles")
              .select("id")
              .eq("id", user.id)
              .maybeSingle();

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
          console.log(`Processed batch ${i / batchSize + 1}`);
        }

        return authUsers.length;
      } catch (error) {
        console.error("Detailed migration error:", error);
        throw error;
      }
    },
    onSuccess: (count) => {
      toast.success(`Successfully migrated ${count} users`);
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error: Error) => {
      console.error("Migration error:", error);
      toast.error(`Failed to migrate users: ${error.message}`);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error in UsersList:", error);
    return <div>Error loading users: {error.message}</div>;
  }

  const filteredUsers = users?.filter(
    (user) => user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <UsersTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMigrate={() => migrateUsers.mutate()}
        onDownload={downloadCsv}
        isMigrating={migrateUsers.isPending}
      />
      <UsersTable users={filteredUsers || []} />
    </div>
  );
}