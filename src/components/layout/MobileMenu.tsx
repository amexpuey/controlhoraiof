
import { Link } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  LayoutGrid, 
  X, 
  User,
  CheckCircle,
  Book
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuItems = [
    { label: 'Inicio', href: '/', icon: Home },
    { label: 'Directorio', href: '/directorio', icon: LayoutGrid },
    { label: 'Blog', href: '/blog', icon: BookOpen },
  ];
  
  const toolsItems = [
    { label: 'Verificador de cumplimiento', href: '/compliance-checker', icon: CheckCircle },
    { label: 'Módulos de aprendizaje', href: '/learning', icon: Book },
  ];
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 max-w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-semibold" style={{ color: 'var(--text)' }}>Menú</h2>
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
                    className="flex items-center gap-3 px-4 py-3 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="px-4 py-2" style={{ borderTop: '1px solid var(--border)' }}>
              <h3 className="font-medium text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Herramientas</h3>
            </div>
            
            <ul className="py-2">
              {toolsItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5" style={{ color: 'var(--green)' }} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 mt-auto" style={{ borderTop: '1px solid var(--border)' }}>
            <a
              href="https://inwout.com/demo-online"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-green w-full"
            >
              <User className="mr-2 h-4 w-4" />
              Solicitar Demo
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
