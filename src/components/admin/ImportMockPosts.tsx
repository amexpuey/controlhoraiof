
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockBlogPosts } from "@/data/mockBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ImportMockPosts() {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<{imported: number, total: number, current: string}>({
    imported: 0,
    total: mockBlogPosts.length,
    current: ""
  });
  
  const handleImport = async () => {
    try {
      setImporting(true);
      
      for (let i = 0; i < mockBlogPosts.length; i++) {
        const post = mockBlogPosts[i];
        setProgress({
          imported: i,
          total: mockBlogPosts.length,
          current: post.title
        });
        
        // Check if post already exists (by slug)
        const { data: existingPost } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', post.slug)
          .single();
          
        if (existingPost) {
          console.log(`Post "${post.title}" already exists, updating...`);
          
          // Update existing post
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({
              title: post.title,
              content: post.content,
              excerpt: post.excerpt,
              category: post.category,
              featured_image: post.featured_image,
              author: post.author,
              reading_time: post.reading_time,
              published_at: post.published_at,
              related_apps: post.related_apps
            })
            .eq('id', existingPost.id);
            
          if (updateError) {
            console.error(`Error updating post "${post.title}":`, updateError);
            toast.error(`Error al actualizar: ${post.title}`);
          } else {
            console.log(`Updated post: ${post.title}`);
          }
        } else {
          console.log(`Importing new post: "${post.title}"`);
          
          // Insert new post
          const { error: insertError } = await supabase
            .from('blog_posts')
            .insert({
              ...post,
              // Don't override the id from mockBlogPosts
              id: undefined
            });
            
          if (insertError) {
            console.error(`Error importing post "${post.title}":`, insertError);
            toast.error(`Error al importar: ${post.title}`);
          } else {
            console.log(`Imported post: ${post.title}`);
          }
        }
        
        // Small delay to avoid overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      setProgress({
        imported: mockBlogPosts.length,
        total: mockBlogPosts.length,
        current: "Completado"
      });
      
      toast.success(`Se han importado ${mockBlogPosts.length} artículos correctamente.`);
    } catch (error) {
      console.error("Error during import:", error);
      toast.error("Error durante la importación");
    } finally {
      setImporting(false);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Importar Artículos Mockados a la Base de Datos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 mb-2">
              Esta herramienta importará {mockBlogPosts.length} artículos desde los datos mockados a la base de datos de Supabase.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
              <li>Los artículos existentes (mismo slug) serán actualizados</li>
              <li>Los nuevos artículos serán insertados</li>
              <li>Se preservarán las imágenes destacadas y metadatos</li>
            </ul>
          </div>
          
          {importing && (
            <div className="border rounded p-4 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progreso:</span>
                <span className="text-sm text-gray-600">{progress.imported} de {progress.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${(progress.imported / progress.total) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2 text-gray-600 truncate">
                {progress.current}
              </p>
            </div>
          )}
          
          {progress.imported === mockBlogPosts.length && progress.imported > 0 ? (
            <div className="flex items-center bg-green-50 text-green-700 p-3 rounded border border-green-200">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span>¡Importación completada con éxito!</span>
            </div>
          ) : null}
          
          <Button 
            onClick={handleImport}
            disabled={importing}
            className="w-full"
          >
            {importing ? 'Importando...' : 'Iniciar Importación'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
