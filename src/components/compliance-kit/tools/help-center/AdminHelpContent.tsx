
import React from "react";
import { HelpStep } from "@/hooks/useHelpContent";

// Import refactored components
import IntroSection from "./admin/IntroSection";
import VideoTutorial from "./admin/VideoTutorial";
import ScheduleConfigSection from "./admin/ScheduleConfigSection";
import HelpStepsAccordion from "./admin/HelpStepsAccordion";
import HeaderActionsSection from "./admin/HeaderActionsSection";
import ActionSupportSection from "./admin/ActionSupportSection";

interface AdminHelpContentProps {
  helpSteps: HelpStep[];
  isLoading: boolean;
  error: string | null;
}

export default function AdminHelpContent({ helpSteps, isLoading, error }: AdminHelpContentProps) {
  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <IntroSection />

      {/* Video Tutorial Section */}
      <VideoTutorial />

      {/* Schedule Configuration Section */}
      <ScheduleConfigSection />

      {/* Header with Actions */}
      <HeaderActionsSection />

      {/* Help Steps Accordion */}
      <HelpStepsAccordion 
        helpSteps={helpSteps} 
        isLoading={isLoading} 
        error={error} 
      />

      {/* Support Section */}
      <ActionSupportSection />
    </div>
  );
}
