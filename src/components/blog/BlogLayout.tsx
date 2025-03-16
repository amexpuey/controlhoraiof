
import { Link } from "react-router-dom";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header with Gray Background */}
      <div className="h-14 bg-gray-800 flex items-center justify-between px-6">
        <Link to="/" className="text-lg font-medium text-white">
          Control Horario
        </Link>
        <div className="flex items-center gap-6">
          <Link 
            to="/blog" 
            className="text-sm text-gray-200 hover:text-white transition-colors duration-200"
          >
            Blog
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm text-gray-200 hover:text-white transition-colors duration-200"
          >
            Directorio
          </Link>
        </div>
      </div>
      
      {children}
    </div>
  );
}
