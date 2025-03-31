
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ComplianceKitFAQ() {
  const faqs = [
    {
      question: "¿Es completamente gratuito el Kit de Cumplimiento Legal?",
      answer: "Sí, todas las herramientas y recursos del Kit Interactivo de Cumplimiento Legal son 100% gratuitos. No requieren registro ni pago alguno. Nuestro objetivo es ayudar a las empresas a mejorar su cumplimiento normativo sin barreras."
    },
    {
      question: "¿Cuándo debo utilizar el Verificador de Cumplimiento?",
      answer: "Te recomendamos utilizar el Verificador de Cumplimiento como primer paso, ya que te dará una visión general de tu situación actual y te guiará hacia las herramientas más relevantes según tus necesidades específicas."
    },
    {
      question: "¿Las plantillas son válidas legalmente en España?",
      answer: "Sí, todas nuestras plantillas están diseñadas de acuerdo con la legislación laboral española vigente. No obstante, recomendamos que un asesor legal revise la documentación antes de su implementación formal para adaptarla a las particularidades de tu empresa."
    },
    {
      question: "¿Con qué frecuencia se actualiza el contenido del Kit?",
      answer: "Actualizamos regularmente nuestro Kit para reflejar los cambios en la legislación laboral española. Recomendamos revisitar las herramientas trimestralmente o después de anuncios de cambios legislativos significativos."
    },
    {
      question: "¿Puedo guardar mis resultados y documentos generados?",
      answer: "Sí, todas nuestras herramientas permiten guardar y/o exportar los resultados y documentos generados en formato PDF para que puedas conservarlos o compartirlos con tu equipo o asesores."
    },
    {
      question: "¿Este Kit reemplaza la necesidad de un asesor legal?",
      answer: "No, el Kit es una herramienta complementaria pero no sustituye el asesoramiento legal profesional. Te ayuda a identificar áreas de mejora y a preparar documentación, pero recomendamos consultar con expertos legales para casos específicos o situaciones complejas."
    }
  ];

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Preguntas Frecuentes
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Resolvemos tus dudas sobre el Kit Interactivo de Cumplimiento Legal
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
