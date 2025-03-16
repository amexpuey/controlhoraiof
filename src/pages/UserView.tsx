
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/user-view/AppHeader";
import { AboutSection } from "@/components/user-view/AboutSection";
import { FeaturesSection } from "@/components/user-view/FeaturesSection";
import { HighlightsSection } from "@/components/user-view/HighlightsSection";
import { Sidebar } from "@/components/user-view/Sidebar";
import AdBanner from "@/components/ads/AdBanner";
import { useEffect, useState } from "react";

export default function UserView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [adKey, setAdKey] = useState(Date.now());

  useEffect(() => {
    setAdKey(Date.now());
  }, [slug]);

  const { data: company, isLoading, error } = useQuery({
    queryKey: ['company', slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error('No slug provided');
      }

      console.log('Fetching company with slug:', slug);
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching company:', error);
        throw error;
      }

      if (!data) {
        console.error('Company not found with slug:', slug);
        throw new Error(`Company not found with slug: ${slug}`);
      }

      console.log('Fetched company data:', data);
      return data;
    },
    retry: false,
    refetchOnWindowFocus: true,
    gcTime: 0,
    staleTime: 0
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">App not found</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader company={company} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AboutSection company={company} />
            <FeaturesSection company={company} />
            <HighlightsSection company={company} />
          </div>
          
          <div className="space-y-6">
            <Sidebar company={company} />
            
            <div className="flex justify-center sticky top-4">
              <AdBanner 
                key={`sidebar-${adKey}`}
                position="app-page"
                adSize="300x600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
