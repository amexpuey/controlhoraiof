
import { Link } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  BookOpen, 
  LayoutGrid, 
  LogOut, 
  Shield,
  User,
  X 
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = [
    {
      label: 'Inicio',
      href: '/',
      icon: Home
    },
    {
      label: 'Mejores Apps',
      href: '/dashboard',
      icon: LayoutGrid
    },
    {
      label: 'Blog',
      href: '/blog',
      icon: BookOpen
    },
    {
      label: 'Plantillas',
      href: '/plantillas',
      icon: FileText
    },
    {
      label: 'Kit Legal',
      href: '/kit-legal',
      icon: Shield
    }
  ];
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 max-w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Menú</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1">
            <ul className="py-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5 text-gray-500" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t mt-auto">
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-700"
              asChild
            >
              <a href="https://inwout.com/demo-online" target="_blank" rel="noopener noreferrer">
                <User className="mr-2 h-4 w-4" />
                Solicitar Demo
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
