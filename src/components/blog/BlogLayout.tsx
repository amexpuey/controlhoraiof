
import { Link } from "react-router-dom";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "../layout/MobileMenu";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--white)" }}>
      {/* Header with INWOUT dark background */}
      <div
        className="h-16 border-b flex items-center justify-between px-4 md:px-6 shadow-md z-10 relative"
        style={{ background: "var(--dark)" }}
      >
        <Link
          to="/"
          className="text-lg md:text-xl font-semibold transition-colors truncate max-w-[180px] md:max-w-none"
          style={{ color: "var(--dark-text)" }}
        >
          Fichajes Empresas .es
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          </>
        ) : (
          <div className="flex items-center gap-4">
            
            <Link
              to="/blog"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--dark-text)" }}
            >
              Blog
            </Link>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-md transition-colors hover:opacity-90"
              style={{ background: "var(--green)", color: "var(--white)" }}
            >
              <img
                src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                alt="Home"
                className="w-4 h-4"
              />
              Descubre las mejores apps
            </Link>
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
