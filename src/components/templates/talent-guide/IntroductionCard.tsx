
import React from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const IntroductionCard: React.FC = () => {
  return (
    <Card className="mb-8 border-0 shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 md:p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-4">¿Qué puedes hacer con esta guía?</h2>
        <p className="mb-4">
          Si ya has llegado hasta aquí, es porque tu equipo te importa de verdad. Esta guía no solo te ayudará a conocer y entender a las personas de tu equipo, sino que te dará las herramientas necesarias para sacar lo mejor de ellas y llevar a tu equipo al éxito.
        </p>
      </div>
      <CardContent className="bg-white p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Dentro de esta guía encontrarás recursos para:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Ayudar a tu equipo a crecer profesionalmente</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Planificar y dar seguimiento a objetivos claros</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Evaluar el desempeño de tus colaboradores</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Estructurar planes de formación efectivos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Tomar decisiones informadas basadas en datos concretos</span>
          </li>
        </ul>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Beneficios de utilizar esta guía:</h3>
          <ul className="space-y-2 text-blue-900">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Ahorrar tiempo con plantillas ya estructuradas</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Mejorar la experiencia de los colaboradores</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Aumentar la retención del talento en tu organización</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Fomentar el crecimiento organizacional</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
