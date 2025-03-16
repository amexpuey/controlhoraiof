
import { Link } from "react-router-dom";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {children}
    </div>
  );
}
