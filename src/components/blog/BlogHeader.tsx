
import { Link } from "react-router-dom";

export default function BlogHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Link to="/blog" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Blog de Control Horario
            </h1>
          </Link>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Recursos, guías y consejos sobre registro de jornada laboral y productividad
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link 
              to="/blog/categoria/normativa"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              Normativa
            </Link>
            <Link 
              to="/blog/categoria/productividad"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              Productividad
            </Link>
            <Link 
              to="/blog/categoria/herramientas"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              Herramientas
            </Link>
            <Link 
              to="/blog/categoria/guias"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            >
              Guías
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
