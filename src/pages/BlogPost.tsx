
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ChevronLeft, Share2, Tag, ThumbsUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "@/components/ads/AdBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Type definitions for blog post
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image: string;
  published_at: string;
  author: string;
  reading_time: number;
  related_apps?: string[];
};

// Mock blog post for development
const MOCK_POST: BlogPost = {
  id: "1",
  title: "Las 10 mejores aplicaciones de control horario para empresas pequeñas",
  slug: "mejores-aplicaciones-control-horario-empresas-pequenas",
  excerpt: "Descubre cuáles son las mejores soluciones de control horario para empresas de menos de 50 empleados, con análisis detallado de funcionalidades y precios.",
  content: `
## Introducción al control horario en pequeñas empresas

El control horario es una necesidad para cualquier empresa, independientemente de su tamaño. Sin embargo, las empresas pequeñas tienen necesidades específicas y limitaciones presupuestarias que hacen que la elección de una herramienta adecuada sea especialmente importante.

### ¿Por qué es importante el control horario?

La implementación de un sistema de control horario no solo ayuda a cumplir con la legislación vigente, sino que también proporciona beneficios tangibles para la empresa:

- **Optimización de recursos**: Permite identificar patrones de productividad y asignar mejor los recursos humanos.
- **Transparencia**: Ofrece claridad tanto a empleadores como a empleados sobre las horas trabajadas.
- **Facturación precisa**: Para empresas que facturan por hora, garantiza un registro exacto del tiempo dedicado a cada cliente.

## Las 10 mejores aplicaciones

A continuación, analizamos las 10 mejores soluciones disponibles en el mercado español, considerando aspectos como facilidad de uso, precio, y funcionalidades específicas para pequeñas empresas.

### 1. TimeTracker Pro

TimeTracker Pro destaca por su interfaz intuitiva y su precio competitivo. Ideal para empresas de hasta 50 empleados, ofrece funcionalidades como:

- Registro de horas mediante web y aplicación móvil
- Informes personalizables
- Integración con software de nóminas
- Precio: Desde 2€/mes por empleado

### 2. HoraControl

Desarrollada específicamente para el mercado español, HoraControl garantiza el cumplimiento de la normativa vigente sobre registro horario. Sus principales características incluyen:

- Validación biométrica
- Gestión de turnos y vacaciones
- Exportación de informes para inspecciones laborales
- Precio: 3€/mes por empleado

[continúa con el resto de aplicaciones...]

## Conclusión

La elección de una aplicación de control horario dependerá de las necesidades específicas de cada empresa, pero cualquiera de las opciones presentadas en esta lista garantiza un sistema fiable y ajustado a la normativa española.

Recuerda que la implementación exitosa de un sistema de control horario no solo depende del software elegido, sino también de una correcta formación a los empleados y de establecer políticas claras sobre su uso.
  `,
  category: "Time Tracking",
  featured_image: "/lovable-uploads/9f226ae3-40a9-4b11-879e-fa474b885dfb.png",
  published_at: "2023-10-15",
  author: "Carlos Rodríguez",
  reading_time: 8,
  related_apps: ["app-1", "app-2", "app-3"]
};

// Related App Card Component
const RelatedAppCard = ({ appId }: { appId: string }) => {
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
          logo_url: "/lovable-uploads/c2b90205-f41e-4c0d-bf34-bb7a5bba9103.png",
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
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (error) throw error;
        setPost(data as BlogPost);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        // For demo purposes, use mock data
        setPost(MOCK_POST);
      } finally {
        setLoading(false);
      }
    };
    
    // Commented out for now since the table doesn't exist yet
    // fetchPost();
    
    // For demo purposes
    setPost(MOCK_POST);
    setLoading(false);
  }, [slug]);
  
  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Cargando...</div>;
  }
  
  if (!post) {
    return <div className="container mx-auto px-4 py-12 text-center">Artículo no encontrado</div>;
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/blog" className="text-yellow-600 hover:text-yellow-700 flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" /> Volver al blog
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <article className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Tag className="w-4 h-4 mr-1 text-yellow-600" />
                <span className="text-sm text-yellow-700">{post.category}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>{new Date(post.published_at).toLocaleDateString('es-ES')}</span>
                <span className="mx-2">•</span>
                <Users className="w-4 h-4 mr-1" />
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.reading_time} min de lectura</span>
              </div>
              
              <img 
                src={post.featured_image} 
                alt={post.title} 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              {/* Social sharing */}
              <div className="flex items-center justify-between mb-6">
                <Button variant="outline" size="sm" className="text-gray-600">
                  <ThumbsUp className="w-4 h-4 mr-2" /> Me gusta
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600">
                  <Share2 className="w-4 h-4 mr-2" /> Compartir
                </Button>
              </div>
              
              {/* Blog content */}
              <div className="prose max-w-none">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('##')) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.replace('##', '').trim()}</h2>;
                  } else if (paragraph.startsWith('###')) {
                    return <h3 key={index} className="text-xl font-bold mt-5 mb-3">{paragraph.replace('###', '').trim()}</h3>;
                  } else if (paragraph.startsWith('-')) {
                    return <li key={index} className="ml-6">{paragraph.replace('-', '').trim()}</li>;
                  } else if (paragraph.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-4">{paragraph}</p>;
                  }
                })}
              </div>
              
              {/* Author bio */}
              <div className="mt-10 pt-6 border-t">
                <h3 className="text-lg font-bold mb-2">Sobre el autor</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-gray-600">Especialista en software de control horario y cumplimiento normativo</p>
                  </div>
                </div>
              </div>
            </article>
            
            {/* Bottom Ad */}
            <div className="flex justify-center my-8">
              <AdBanner position="in-content" adSize="728x90" />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Sidebar Ad */}
            <AdBanner position="sidebar" adSize="300x250" />
            
            {/* Related Apps */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-bold mb-4">Aplicaciones relacionadas</h3>
              <div className="space-y-4">
                {post.related_apps?.map((appId) => (
                  <RelatedAppCard key={appId} appId={appId} />
                ))}
              </div>
            </div>
            
            {/* Interactive Tool Teaser */}
            <div className="bg-yellow-50 rounded-lg shadow-sm p-4 border border-yellow-200">
              <h3 className="text-lg font-bold mb-2 text-yellow-800">¿Cuál es la mejor app para ti?</h3>
              <p className="text-sm text-yellow-700 mb-4">Responde a nuestro cuestionario y descubre la herramienta de control horario ideal para tu empresa.</p>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                Iniciar cuestionario
              </Button>
            </div>
            
            {/* Another Sidebar Ad */}
            <AdBanner position="sidebar" adSize="300x250" />
          </div>
        </div>
      </main>
    </div>
  );
}
