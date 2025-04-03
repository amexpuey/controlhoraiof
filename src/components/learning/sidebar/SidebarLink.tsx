
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  icon: LucideIcon;
  text: string;
  path: string;
  isActive?: boolean;
  isCompleted?: boolean;
  iconColor?: string;
  onClick?: () => void;
  external?: boolean;
}

export default function SidebarLink({
  icon: Icon,
  text,
  path,
  isActive = false,
  isCompleted = false,
  iconColor = "text-gray-400",
  onClick,
  external = false
}: SidebarLinkProps) {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
      return;
    }
    
    if (external) {
      // Do nothing, let the default anchor behavior handle it
      return;
    }
    
    e.preventDefault();
    navigate(path);
  };
  
  // Determine classes based on active state
  const linkClasses = `flex items-center py-2 px-3 rounded-md transition-colors cursor-pointer ${
    isActive 
      ? "bg-[#222A39] text-white" 
      : "text-gray-300 hover:bg-[#222A39] hover:text-white"
  }`;
  
  const content = (
    <>
      {isCompleted ? (
        <span className="h-4 w-4 text-[#0BC8C1] mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </span>
      ) : (
        <Icon className={`h-4 w-4 ${iconColor} mr-2`} />
      )}
      <span className="text-sm">{text}</span>
    </>
  );
  
  if (external) {
    return (
      <a 
        href={path} 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  
  return (
    <div 
      onClick={handleClick}
      className={linkClasses}
    >
      {content}
    </div>
  );
}
