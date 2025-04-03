
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Settings, Users, ListChecks, MapPin, Bell, FileText, Calendar, Link } from "lucide-react";
import { HelpStep } from "@/hooks/useHelpContent";
import HelpStepItems from "../../HelpStepItems";

interface HelpStepsAccordionProps {
  helpSteps: HelpStep[];
  isLoading: boolean;
  error: string | null;
}

export default function HelpStepsAccordion({ helpSteps, isLoading, error }: HelpStepsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {isLoading ? (
        <div className="py-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0BC8C1] border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Cargando contenido...</p>
        </div>
      ) : (
        helpSteps.length > 0 ? (
          helpSteps.map((section, index) => (
            <AccordionItem key={section.id} value={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <AccordionTrigger className="px-4 py-3 bg-white hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#0BC8C1]/10 p-2 rounded-full">
                    {section.step_order === 1 && <Settings className="h-5 w-5 text-[#0BC8C1]" />}
                    {section.step_order === 2 && <Users className="h-5 w-5 text-[#0BC8C1]" />}
                    {section.step_order === 3 && <ListChecks className="h-5 w-5 text-[#0BC8C1]" />}
                    {section.step_order === 4 && <MapPin className="h-5 w-5 text-[#0BC8C1]" />}
                    {section.step_order === 5 && <Bell className="h-5 w-5 text-[#0BC8C1]" />}
                    {section.step_order === 6 && <FileText className="h-5 w-5 text-[#0BC8C1]" />}
                    {section.step_order === 7 && <Calendar className="h-5 w-5 text-[#0BC8C1]" />}
                    {section.step_order === 8 && <Link className="h-5 w-5 text-[#0BC8C1]" />}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-lg">{index + 1}. {section.title}</div>
                    <div className="text-sm text-gray-500">{section.description}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-2 border-t border-gray-100">
                <HelpStepItems step={section} />
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-600">No hay contenido disponible en este momento.</p>
          </div>
        )
      )}
    </Accordion>
  );
}
