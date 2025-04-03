
import React from "react";
import { Clock, Settings, BarChart } from "lucide-react";
import SidebarLink from "./SidebarLink";

export default function AccountLinks() {
  return (
    <>
      <SidebarLink 
        icon={Clock}
        text="Acceder a Fichajes"
        path="https://app.inwout.com/login"
        external={true}
      />
      
      <SidebarLink 
        icon={Settings}
        text="Configuración"
        path="https://app.inwout.com/settings"
        external={true}
      />
      
      <SidebarLink 
        icon={BarChart}
        text="Informes"
        path="https://app.inwout.com/reports"
        external={true}
      />
    </>
  );
}
