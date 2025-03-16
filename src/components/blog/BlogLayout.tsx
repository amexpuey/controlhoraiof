
import { Link } from "react-router-dom";
import { ToolsDropdown } from "../ui/ToolsDropdown";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with dark gradient background */}
      <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 border-b flex items-center justify-between px-6 shadow-md z-10 relative">
        <Link to="/" className="text-xl font-semibold text-white hover:text-gray-200 transition-colors">
          Control Horario Electrónico
        </Link>
        <div className="flex items-center gap-6">
          <ToolsDropdown />
          <Link 
            to="/blog" 
            className="text-sm font-medium text-white hover:text-gray-200 transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>
      
      {children}
    </div>
  );
}
