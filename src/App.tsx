import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import Admin from "./pages/Admin";
import AdminAppEdit from "./pages/AdminAppEdit";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Handle initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        console.log("User is authenticated:", session.user);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (event === 'SIGNED_IN') {
        console.log('SIGNED_IN', session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Index />
                )
              } 
            />
            <Route path="/verify" element={<Verify />} />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/edit/:id" element={<AdminAppEdit />} />
            <Route path="/admin/new" element={<AdminAppEdit />} />
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;