
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImportMockPosts from "@/components/admin/ImportMockPosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ImportBlogPosts() {
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPostsCount = async () => {
      try {
        const { count, error } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });
          
        if (error) {
          console.error("Error fetching posts count:", error);
        } else {
          setPostsCount(count);
        }
      } catch (error) {
        console.error("Exception fetching posts count:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostsCount();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/admin" className="text-yellow-600 hover:text-yellow-700 flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Volver al panel de administración
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Importar Artículos del Blog</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ImportMockPosts />
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
              
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Artículos en base de datos:</span>{" "}
                    {postsCount !== null ? postsCount : "Error al cargar"}
                  </p>
                  
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Artículos en datos mock:</span>{" "}
                    {import.meta.glob("@/data/mockBlogPosts.ts") ? 
                      `${import.meta.glob("@/data/mockBlogPosts").length}` : 
                      "Datos mock no encontrados"
                    }
                  </p>
                  
                  <Link to="/blog">
                    <Button variant="outline" className="w-full">
                      Ver Blog
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
