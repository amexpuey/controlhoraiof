import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import AdBanner from "@/components/ads/AdBanner";
import { CalendarDays, ChevronRight, Tag, Users } from "lucide-react";

// Define blog post type
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featured_image: string;
  published_at: string;
  author: string;
  reading_time: number;
  related_apps?: string[];
};

// Interactive Tool Component
const InteractiveTool = ({ toolType }: { toolType: string }) => {
  return (
    <Card className="shadow-md border-yellow-200 hover:shadow-lg transition-shadow">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="text-xl text-yellow-800">
          {toolType === 'quiz' && '🧩 Software Finder Quiz'}
          {toolType === 'calculator' && '🧮 Cost Estimator'}
          {toolType === 'checker' && '✅ Compliance Checker'}
        </CardTitle>
        <CardDescription>
          {toolType === 'quiz' && 'Encuentra la herramienta perfecta para tu empresa'}
          {toolType === 'calculator' && 'Calcula el coste de implementación'}
          {toolType === 'checker' && 'Comprueba si cumples con la normativa'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-600 mb-4">
          {toolType === 'quiz' && 'Este cuestionario te ayudará a encontrar la mejor herramienta de control horario según las necesidades específicas de tu empresa.'}
          {toolType === 'calculator' && 'Calcula cuánto te costará implementar una solución de control horario en base al número de empleados y funcionalidades.'}
          {toolType === 'checker' && 'Verifica si tu empresa cumple con la normativa española de registro horario a través de este sencillo test.'}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300">
          Comenzar {toolType === 'quiz' ? 'quiz' : toolType === 'calculator' ? 'cálculo' : 'comprobación'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });
          
        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data as BlogPost[]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);
    
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Cargando artículos...</p>
    </div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Black Header with Yellow Text */}
      <div className="h-14 bg-black border-b flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-semibold text-yellow-500">
          Control Horario Electrónico
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/blog" 
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            Blog
          </Link>
          <Link 
            to="/dashboard" 
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            Directorio
          </Link>
        </div>
      </div>
      
      {/* Blog Header */}
      <div className="bg-yellow-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Blog de Control Horario
          </h1>
          <p className="text-xl text-yellow-100 text-center max-w-2xl mx-auto">
            Recursos, guías y consejos sobre registro de jornada laboral y productividad
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        {/* Top Ad */}
        <div className="flex justify-center mb-8">
          <AdBanner position="top" adSize="728x90" />
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              Todos
            </TabsTrigger>
            <TabsTrigger value="Time Tracking" onClick={() => setActiveCategory("Time Tracking")}>
              Control Horario
            </TabsTrigger>
            <TabsTrigger value="HR Compliance" onClick={() => setActiveCategory("HR Compliance")}>
              Normativa
            </TabsTrigger>
            <TabsTrigger value="Productivity" onClick={() => setActiveCategory("Productivity")}>
              Productividad
            </TabsTrigger>
            <TabsTrigger value="Remote Work" onClick={() => setActiveCategory("Remote Work")}>
              Trabajo Remoto
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {/* Featured Post */}
            {filteredPosts.length > 0 && (
              <div className="mb-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={filteredPosts[0].featured_image} 
                      alt={filteredPosts[0].title}
                      className="w-full h-72 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center mb-2">
                      <Tag className="w-4 h-4 mr-1 text-yellow-600" />
                      <span className="text-sm text-yellow-700">{filteredPosts[0].category}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{filteredPosts[0].title}</h2>
                    <p className="text-gray-600 mb-4">{filteredPosts[0].excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      <span>{new Date(filteredPosts[0].published_at).toLocaleDateString('es-ES')}</span>
                      <span className="mx-2">•</span>
                      <Users className="w-4 h-4 mr-1" />
                      <span>{filteredPosts[0].author}</span>
                      <span className="mx-2">•</span>
                      <span>{filteredPosts[0].reading_time} min de lectura</span>
                    </div>
                    <Link to={`/blog/${filteredPosts[0].slug}`}>
                      <Button className="bg-yellow-500 hover:bg-yellow-600">
                        Leer artículo completo <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {filteredPosts.slice(1).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.featured_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-1">
                      <Tag className="w-3 h-3 mr-1 text-yellow-600" />
                      <span className="text-xs text-yellow-700">{post.category}</span>
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      <span>{new Date(post.published_at).toLocaleDateString('es-ES')}</span>
                      <span className="mx-1">•</span>
                      <span>{post.reading_time} min</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/blog/${post.slug}`} className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center">
                      Leer más <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Same content for other tabs, will be filtered by the state */}
          <TabsContent value="Time Tracking" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
          <TabsContent value="HR Compliance" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
          <TabsContent value="Productivity" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
          <TabsContent value="Remote Work" className="space-y-4">
            {/* Content is filtered by the activeCategory state */}
          </TabsContent>
        </Tabs>
        
        {/* In-content Ad */}
        <div className="flex justify-center my-10">
          <AdBanner position="in-content" adSize="300x250" />
        </div>
        
        {/* Interactive Tools Section */}
        <section className="my-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Herramientas Interactivas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <InteractiveTool toolType="quiz" />
            <InteractiveTool toolType="calculator" />
            <InteractiveTool toolType="checker" />
          </div>
        </section>
        
        {/* Bottom Ad */}
        <div className="flex justify-center mt-10">
          <AdBanner position="bottom" adSize="728x90" />
        </div>
      </main>
    </div>
  );
}
