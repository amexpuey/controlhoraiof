import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "./FeaturedPost";
import { mockBlogPosts } from "@/data/mockBlogPosts";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogPostSidebarProps {
  relatedApps?: string[];
}

export default function BlogPostSidebar({ relatedApps }: BlogPostSidebarProps) {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await (supabase
          .from('site_articles' as any)
          .select('*') as any)
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false })
          .limit(3);
        
        if (!error && data && data.length > 0) {
          const transformedPosts = data.map(post => {
            let relatedApps = post.related_apps;
            if (!Array.isArray(relatedApps)) {
              relatedApps = relatedApps ? [relatedApps] : [];
            }
            
            return {
              ...post,
              id: post.id.toString(),
              related_apps: relatedApps
            } as BlogPost;
          });
          
          setRecentPosts(transformedPosts);
        } else {
          console.log('Fallback to mock data for recent posts');
          setRecentPosts(mockBlogPosts.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        setRecentPosts(mockBlogPosts.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentPosts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-lg shadow-sm p-4 border" style={{ background: "var(--green-bg)", borderColor: "var(--green)" }}>
        <h3 className="text-lg font-bold mb-2 text-left" style={{ color: "var(--green-dark)" }}>Verificador de cumplimiento</h3>
        <p className="text-sm mb-4 text-left" style={{ color: "var(--green-dark)" }}>Comprueba si cumples con la normativa laboral de registro horario y evita multas</p>
        <Link to="/compliance-checker">
          <Button 
            className="w-full text-white"
            style={{ background: "var(--green)" }}
          >
            Comprobar ahora
          </Button>
        </Link>
      </div>
      
      <div className="sticky top-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-bold mb-4" style={{ color: "var(--dark)" }}>App Destacada</h3>
          <a href="/mejores-apps-control-horario/inwout" className="block">
            <img 
              src="/lovable-uploads/d6062b36-0681-45de-b8e9-c72886e9b4eb.png" 
              alt="INWOUT - Automatiza el Control Horario con Geofence" 
              className="w-full h-auto rounded-lg hover:opacity-95 transition-opacity"
              style={{ maxWidth: "300px" }}
            />
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6 border" style={{ borderColor: "var(--border)" }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: "var(--dark)" }}>Últimos artículos</h3>
          {loading ? (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Cargando artículos...</p>
          ) : (
            <ScrollArea className="h-[350px] pr-3">
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="pb-4 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                    <Link to={`/blog/${post.slug}`} className="group">
                      <div className="h-32 rounded-md overflow-hidden mb-2">
                        <img 
                          src={post.featured_image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2 transition-colors" style={{ color: "var(--dark)" }}>
                        {post.title}
                      </h4>
                      <div className="flex items-center text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        <CalendarDays className="w-3 h-3 mr-1" />
                        <span>{new Date(post.published_at).toLocaleDateString('es-ES')}</span>
                      </div>
                    </Link>
                  </div>
                ))}
                <Link to="/blog" className="flex items-center text-sm font-medium mt-2" style={{ color: "var(--green)" }}>
                  Ver todos los artículos <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
