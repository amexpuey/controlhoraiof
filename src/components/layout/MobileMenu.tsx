
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-[80%] max-w-[300px] bg-gray-800 shadow-lg overflow-auto"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">Menú</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-gray-700" 
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 py-4">
                <nav className="space-y-1 px-3">
                  <Link 
                    to="/plantillas" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                    onClick={onClose}
                  >
                    Plantillas
                  </Link>
                  <Link 
                    to="/blog" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                    onClick={onClose}
                  >
                    Blog
                  </Link>
                </nav>
              </div>
              
              <div className="p-4 border-t border-gray-700">
                <Link 
                  to="/" 
                  className="flex items-center gap-1.5 text-sm font-medium bg-yellow-100 text-gray-800 hover:bg-yellow-200 px-3 py-2 rounded-md transition-colors w-full justify-center"
                  onClick={onClose}
                >
                  <img
                    src="/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png"
                    alt="Home"
                    className="w-4 h-4"
                  />
                  Descubre las mejores apps
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
