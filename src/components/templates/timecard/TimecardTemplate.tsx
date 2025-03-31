
import React, { useState } from "react";
import TimecardHeader from "./header/TimecardHeader";
import TimecardTabs from "./tabs/TimecardTabs";
import InstructionsSection from "./instructions/InstructionsSection";

export default function TimecardTemplate() {
  const [period, setPeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("calculator");
  
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <TimecardHeader />
        
        <TimecardTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          period={period}
          setPeriod={setPeriod}
        />
        
        <InstructionsSection />
      </div>
    </div>
  );
}
