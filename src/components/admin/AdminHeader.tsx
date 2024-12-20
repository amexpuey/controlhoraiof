import { Link, useLocation } from "react-router-dom";

export default function AdminHeader() {
  const location = useLocation();
  
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-8">
        <nav className="flex space-x-6">
          <Link
            to="/admin/blog"
            className={`py-4 px-2 border-b-2 ${
              location.pathname.startsWith('/admin/blog')
                ? 'border-primary text-primary font-medium'
                : 'border-transparent hover:text-primary'
            }`}
          >
            Blog Articles
          </Link>
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
        </nav>
      </div>
    </div>
  );
}