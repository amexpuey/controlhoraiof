
import React from "react";
import type { BlogPost } from "@/components/blog/FeaturedPost";
import { CalendarDays, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Calculate formatted date if created_at exists
  const formattedDate = post.published_at ? new Date(post.published_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  // Calculate reading time (assumes average reading speed of 200 words per minute)
  const contentText = post.content || '';
  const wordCount = contentText.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Function to format specific article content
  const formatSpecialArticleContent = (slug: string, content: string) => {
    if (slug === "como-cumplir-normativa-registro-horario") {
      // Format the content with proper HTML tags according to guidelines
      return `
        <div class="article-content">
          <h1 class="text-3xl font-bold mb-6">Cómo cumplir con la normativa de registro horario en España</h1>
          
          <p>El registro horario se ha convertido en un pilar fundamental para garantizar la transparencia y el cumplimiento de las normativas laborales en España. Desde la entrada en vigor del Real Decreto-ley 8/2019, todas las empresas deben implementar sistemas que permitan documentar las jornadas de trabajo de sus empleados, evitando así sanciones y promoviendo un entorno laboral justo.</p>
          
          <p>En este artículo, exploraremos el marco legal que rige el control horario, las distintas formas de implementar estas soluciones, y las mejores prácticas para asegurar el cumplimiento normativo. Asimismo, se analizarán las tecnologías disponibles, los errores comunes que pueden surgir y la importancia de la auditoría interna y la formación continua.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Contexto y marco legal del registro horario</h2>
          
          <p>El registro horario es una obligación impuesta a todas las empresas españolas desde la entrada en vigor del Real Decreto-ley 8/2019. Esta normativa busca proteger los derechos laborales y garantizar la transparencia en la gestión de la jornada de trabajo.</p>
          
          <p><strong>El objetivo principal</strong> es evitar abusos y asegurar que los trabajadores reciban una remuneración justa por las horas efectivamente trabajadas. Además, el registro horario facilita el control en la realización de horas extraordinarias y el cumplimiento de los límites legales establecidos en los convenios colectivos.</p>
          
          <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">
            "La implementación de un sistema de control horario no solo es un requisito legal, sino también una herramienta indispensable para la gestión eficaz de los recursos humanos."
          </blockquote>
          
          <p>La legislación actual establece que todas las empresas, independientemente de su tamaño o sector, deben llevar un registro preciso y actualizado de las horas de entrada y salida de cada empleado. Esta obligación se aplica tanto a trabajadores en plantilla como a aquellos con modalidades de contratación flexible, aunque existen algunas excepciones, como es el caso de ciertos empleados de alta dirección o autónomos sin personal a cargo.</p>
          
          <p>Este marco legal se enmarca en un contexto en el que la digitalización y la automatización han permitido desarrollar sistemas cada vez más sofisticados. Por ello, la normativa también incentiva el uso de tecnologías modernas que faciliten la verificación de las jornadas laborales de manera automática y sin errores.</p>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Implementación de sistemas de control horario</h2>
          
          <p>Adoptar un sistema de control horario implica un proceso de transformación que abarca desde la selección de la tecnología adecuada hasta la formación del personal. Uno de los aspectos clave es definir qué método se adapta mejor a las necesidades específicas de la empresa.</p>
          
          <p>Las opciones van desde sistemas basados en aplicaciones móviles y web hasta soluciones más avanzadas como el reconocimiento biométrico y el uso de tarjetas RFID.</p>
          
          <p>La primera etapa en la implementación es realizar un diagnóstico interno para identificar las carencias actuales en el registro de la jornada laboral. A partir de este análisis, se puede optar por soluciones automatizadas que minimicen el error humano.</p>
          
          <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">
            "Una correcta implementación del control horario es la base para mejorar la productividad y garantizar el cumplimiento de las obligaciones legales."
          </blockquote>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Tecnologías y herramientas para el control horario</h2>
          
          <p>El mercado actual ofrece una amplia variedad de herramientas para el control horario, cada una con características y ventajas particulares. Entre las soluciones más destacadas se encuentran:</p>
          
          <ul class="list-disc pl-6 my-4 space-y-2">
            <li>Aplicaciones móviles y web, que permiten el fichaje mediante dispositivos inteligentes</li>
            <li>Sistemas biométricos, que garantizan una alta seguridad mediante el reconocimiento de huellas dactilares o facial</li>
            <li>Tecnología de Geofence, ideal para empleados que permanecen en una misma ubicación</li>
            <li>Tarjetas RFID y reconocimiento mediante PIN o códigos QR</li>
          </ul>
          
          <p>La opción de Geofence, por ejemplo, es ideal para empleados que permanecen en una misma ubicación durante su jornada laboral, ya que automatiza el proceso de fichaje mediante la detección de la posición geográfica.</p>
          
          <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">
            "El avance tecnológico ha permitido que el control horario sea más preciso, seguro y adaptable a las necesidades de cada empresa."
          </blockquote>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Buenas prácticas para cumplir la normativa</h2>
          
          <p>Cumplir con la normativa de registro horario no se limita únicamente a la implementación tecnológica, sino que también requiere la adopción de buenas prácticas organizativas. Una de las principales recomendaciones es la realización de auditorías internas periódicas para verificar que el sistema funcione correctamente.</p>
          
          <p>Además, es fundamental contar con un protocolo de actuación que detalle los procedimientos a seguir en caso de incidencias o errores en el registro. Esto incluye la formación constante de los empleados, para que conozcan el funcionamiento del sistema y la importancia de registrar correctamente su jornada laboral.</p>
          
          <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">
            "Implementar un sistema de control horario es solo el primer paso; la clave está en mantenerlo actualizado y en capacitar al personal para asegurar su correcto uso."
          </blockquote>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Errores comunes y cómo evitarlos</h2>
          
          <p>A pesar de contar con sistemas modernos de control horario, es frecuente que se cometan errores que pueden derivar en sanciones y conflictos laborales. Entre los errores más comunes se encuentran:</p>
          
          <ul class="list-disc pl-6 my-4 space-y-2">
            <li>Falta de capacitación del personal</li>
            <li>Configuración incorrecta de los dispositivos</li>
            <li>Ausencia de protocolos de verificación y auditoría</li>
            <li>Uso de registros manuales obsoletos (hojas de cálculo o Excel)</li>
          </ul>
          
          <p>Uno de los problemas recurrentes es el registro manual, que aún se utiliza en algunas empresas mediante hojas de cálculo o Excel. Este método, además de ser obsoleto, es propenso a errores y dificulta la obtención de datos precisos.</p>
          
          <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">
            "El error humano y la inercia organizativa son dos de los mayores obstáculos para un control horario eficaz."
          </blockquote>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">El papel de la auditoría y la formación en el cumplimiento</h2>
          
          <p>La auditoría interna y la formación continua son componentes esenciales para garantizar el cumplimiento de la normativa de registro horario. Realizar auditorías periódicas permite detectar posibles fallos o desviaciones en el sistema, asegurando que los registros sean precisos y estén actualizados.</p>
          
          <p>Por otro lado, la formación del personal es crucial para que todos los empleados comprendan la importancia del control horario y sepan utilizar correctamente las herramientas implementadas. La capacitación debe ser regular y adaptarse a las actualizaciones tecnológicas y normativas.</p>
          
          <blockquote class="border-l-4 border-gray-300 pl-4 italic my-6">
            "La auditoría constante y la formación continua son la mejor garantía para un sistema de control horario efectivo y en cumplimiento con la ley."
          </blockquote>
          
          <h2 class="text-2xl font-bold mt-8 mb-4">Conclusión</h2>
          
          <p>En resumen, cumplir con la normativa de registro horario en España es un proceso que va más allá de la simple implementación tecnológica. Es fundamental comprender el marco legal, elegir la herramienta adecuada y adoptar buenas prácticas organizativas que garanticen la precisión y la transparencia en el registro de la jornada laboral.</p>
          
          <p>Las empresas que apuestan por una gestión transparente y eficiente del control horario no solo evitan sanciones, sino que también mejoran la productividad y el clima laboral. Adoptar estas prácticas y tecnologías es un paso decisivo para construir un entorno laboral justo, seguro y competitivo, en el que el cumplimiento normativo se convierta en una ventaja estratégica.</p>
        </div>
      `;
    }
    
    return null; // Return null for other articles to use default ReactMarkdown
  };
  
  const formattedContent = post.content && post.slug === "como-cumplir-normativa-registro-horario" 
    ? formatSpecialArticleContent(post.slug, post.content) 
    : null;
  
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            src={post.featured_image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 md:p-8">
        {/* Post Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{readingTime} min de lectura</span>
          </div>
        </div>
        
        {/* Post Title */}
        {!formattedContent && (
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
        )}
        
        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-6">
          {formattedContent ? (
            <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
          ) : post.content ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : null}
        </div>
        
        {/* Share Buttons */}
        <div className="border-t border-gray-100 pt-6 mt-8">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">Compartir artículo</h4>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="rounded-full w-9 h-9 p-0">
                <Share2 className="w-4 h-4" />
                <span className="sr-only">Compartir</span>
              </Button>
              {/* Add more share buttons as needed */}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
