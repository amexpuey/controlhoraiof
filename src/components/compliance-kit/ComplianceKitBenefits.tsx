
import React from "react";
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  FileCheck,
  Award,
  Lightbulb
} from "lucide-react";

export default function ComplianceKitBenefits() {
  const benefits = [
    {
      title: "Minimiza riesgos legales",
      description: "Identifica y corrige incumplimientos antes de que se conviertan en sanciones",
      icon: ShieldCheck
    },
    {
      title: "Mejora la eficiencia",
      description: "Optimiza los procesos de gestión de personal y documentación laboral",
      icon: TrendingUp
    },
    {
      title: "Ahorra tiempo",
      description: "Completa tareas de cumplimiento normativo en minutos, no en días",
      icon: Clock
    },
    {
      title: "Documentación profesional",
      description: "Genera los documentos necesarios con plantillas actualizadas y completas",
      icon: FileCheck
    },
    {
      title: "Mejora tu reputación",
      description: "Demuestra compromiso con el bienestar de tus empleados y la legalidad",
      icon: Award
    },
    {
      title: "Aprende mientras haces",
      description: "Comprende la normativa mientras implementas las soluciones",
      icon: Lightbulb
    }
  ];

  return (
    <section className="py-12 bg-white rounded-lg shadow-sm my-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Beneficios de nuestro Kit
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Diseñado para transformar el cumplimiento normativo de una carga en una ventaja competitiva
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full mb-4 shadow-sm">
              <benefit.icon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
