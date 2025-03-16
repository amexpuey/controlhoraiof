
import { Link } from "react-router-dom";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Black Header with Yellow Text */}
      <div className="h-14 bg-black border-b flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-semibold text-yellow-500">
          Control Horario Electrónico
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/blog" 
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            Blog
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            Directorio
          </Link>
        </div>
      </div>
      
      {children}
    </div>
  );
}
