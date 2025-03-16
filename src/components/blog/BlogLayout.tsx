
import React from "react";
import MainHeader from "../MainHeader";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <MainHeader />      
      {children}
    </div>
  );
}
