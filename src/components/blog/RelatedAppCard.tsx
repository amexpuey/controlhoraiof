
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// Base URL for Supabase storage
const STORAGE_BASE_URL = "https://pvqbknpvkohxoftoloda.supabase.co/storage/v1/object/public/app_assets/blog_img";

// Default fallback image if app image is not found
const DEFAULT_APP_IMAGE = `${STORAGE_BASE_URL}/puey_IMAGE_TYPE_Workplace_photo__GENRE_Employment__Law__EMOTI_37ccdd7d-df45-4edf-a1bd-ac4cf42b57d0_3.png`;

interface RelatedAppCardProps {
  appId: string;
}

export default function RelatedAppCard({ appId }: RelatedAppCardProps) {
  const [appData, setAppData] = useState<any>(null);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('id, title, logo_url, slug')
          .eq('id', appId)
          .single();
          
        if (error) throw error;
        setAppData(data);
      } catch (error) {
        console.error('Error fetching app data:', error);
        // For demo purposes, use mock data
        setAppData({
          id: appId,
          title: "TimeTracker Pro",
          logo_url: DEFAULT_APP_IMAGE,
          slug: "timetracker-pro"
        });
      }
    };
    
    fetchAppData();
  }, [appId]);
  
  if (!appData) return null;
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <Link to={`/mejores-apps-control-horario/${appData.slug}`} className="block">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <img 
            src={imageError ? DEFAULT_APP_IMAGE : appData.logo_url} 
            alt={appData.title} 
            className="w-10 h-10 rounded object-cover"
            onError={handleImageError}
          />
          <CardTitle className="text-base">{appData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" className="w-full">
            Ver detalles
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
