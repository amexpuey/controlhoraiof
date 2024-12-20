import AdminHeader from "@/components/admin/AdminHeader";
import UsersList from "@/components/admin/UsersList";

export default function Users() {
  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <UsersList />
      </div>
    </div>
  );
}