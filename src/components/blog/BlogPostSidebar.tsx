
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AdBanner from "@/components/ads/AdBanner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ComplianceChecker from "./ComplianceChecker";
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
  const [isCheckerOpen, setIsCheckerOpen] = useState(false);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false })
          .limit(3);
        
        if (!error && data && data.length > 0) {
          // Transform the data to match BlogPost structure if needed
          const transformedPosts = data.map(post => {
            // Make sure related_apps is always an array
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
      {/* Compliance Checker Tool Teaser - Not sticky */}
      <div className="bg-blue-50 rounded-lg shadow-sm p-4 border border-blue-200">
        <h3 className="text-lg font-bold mb-2 text-blue-800 text-left">Verificador de cumplimiento</h3>
        <p className="text-sm text-blue-700 mb-4 text-left">Comprueba si cumples con la normativa laboral de registro horario y evita multas</p>
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={() => setIsCheckerOpen(true)}
        >
          Comprobar ahora
        </Button>
      </div>
      
      {/* Sticky container for ads and recent posts */}
      <div className="sticky top-4">
        {/* Sidebar Ad */}
        <AdBanner position="sidebar" adSize="300x250" />
        
        {/* Featured App Banner (300x600px) */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
          <h3 className="text-lg font-bold mb-4">App Destacada</h3>
          <a href="/mejores-apps-control-horario/inwout" className="block">
            <img 
              src="/lovable-uploads/d6062b36-0681-45de-b8e9-c72886e9b4eb.png" 
              alt="INWOUT - Automatiza el Control Horario con Geofence" 
              className="w-full h-auto rounded-lg hover:opacity-95 transition-opacity"
              style={{ maxWidth: "300px" }}
            />
          </a>
        </div>
        
        {/* Recent Articles */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-6 border border-gray-200">
          <h3 className="text-lg font-bold mb-4">Últimos artículos</h3>
          {loading ? (
            <p className="text-sm text-gray-500">Cargando artículos...</p>
          ) : (
            <ScrollArea className="h-[350px] pr-3">
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                    <Link to={`/blog/${post.slug}`} className="group">
                      <div className="h-32 rounded-md overflow-hidden mb-2">
                        <img 
                          src={post.featured_image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <CalendarDays className="w-3 h-3 mr-1" />
                        <span>{new Date(post.published_at).toLocaleDateString('es-ES')}</span>
                      </div>
                    </Link>
                  </div>
                ))}
                <Link to="/blog" className="flex items-center text-sm text-yellow-600 hover:text-yellow-700 font-medium mt-2">
                  Ver todos los artículos <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </ScrollArea>
          )}
        </div>
        
        {/* Another Sidebar Ad */}
        <div className="mt-6">
          <AdBanner position="sidebar" adSize="300x250" />
        </div>
      </div>
      
      {/* Compliance Checker Dialog */}
      <Dialog open={isCheckerOpen} onOpenChange={setIsCheckerOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-800">
              Verificador de Cumplimiento Normativo
            </DialogTitle>
            <DialogDescription className="text-blue-700">
              Comprueba si tu empresa cumple con la normativa de registro horario en España
            </DialogDescription>
          </DialogHeader>
          <ComplianceChecker onClose={() => setIsCheckerOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
