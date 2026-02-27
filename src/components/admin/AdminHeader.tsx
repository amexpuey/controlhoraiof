import { Link, useLocation } from "react-router-dom";

export default function AdminHeader() {
  const location = useLocation();
  
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-8">
        <nav className="flex space-x-6">
          <Link
            to="/admin/companies"
            className={`py-4 px-2 border-b-2 ${
              location.pathname.startsWith('/admin/companies')
                ? 'border-primary text-primary font-medium'
                : 'border-transparent hover:text-primary'
            }`}
          >
            Apps Management
          </Link>
          <Link
            to="/admin/users"
            className={`py-4 px-2 border-b-2 ${
              location.pathname.startsWith('/admin/users')
                ? 'border-primary text-primary font-medium'
                : 'border-transparent hover:text-primary'
            }`}
          >
            Users
          </Link>
          <Link
            to="/admin/leads"
            className={`py-4 px-2 border-b-2 ${
              location.pathname.startsWith('/admin/leads')
                ? 'border-primary text-primary font-medium'
                : 'border-transparent hover:text-primary'
            }`}
          >
            Leads
          </Link>
          <Link
            to="/admin/articles"
            className={`py-4 px-2 border-b-2 ${
              location.pathname.startsWith('/admin/articles')
                ? 'border-primary text-primary font-medium'
                : 'border-transparent hover:text-primary'
            }`}
          >
            Artículos
          </Link>
        </nav>
      </div>
    </div>
  );
}