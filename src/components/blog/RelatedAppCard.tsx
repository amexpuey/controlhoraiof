
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface RelatedAppCardProps {
  appId: string;
}

export default function RelatedAppCard({ appId }: RelatedAppCardProps) {
  const [appData, setAppData] = useState<any>(null);
  
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
          logo_url: "/lovable-uploads/f7394dd3-ddba-4a77-9701-646eed9be539.png",
          slug: "timetracker-pro"
        });
      }
    };
    
    fetchAppData();
  }, [appId]);
  
  if (!appData) return null;
  
  return (
    <Link to={`/mejores-apps-control-horario/${appData.slug}`} className="block">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <img 
            src={appData.logo_url} 
            alt={appData.title} 
            className="w-10 h-10 rounded"
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
