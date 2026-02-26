import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// CSV data from the parsed document - all 96 solutions
const solutions = [
  { title: "INWOUT", url: "https://inwout.com/", redirect_url: "https://inwout.com/", slug: "inwout", description: "INWOUT, Control Horario y Gestión de Ausencias Automatizado y unificado", categories: "Control Horario;Targetas RFID;Sistemas Biométricos;PIN;Gestión de Turnos;Reportes;Gratis;Gestión de Ausencias;Gestión de Vacaciones;Apps;Geolocalización;Automatizaciones;Mejor valoradas;Software a medida;Integraciones API;Control de presencia;AI;Teletrabajo;Geofence;Portal del Empleado;Gestión de Turnos;Gestión de Incidencias", rank: 100, isFree: true, isTopRated: true, verified: true, premium: true, is_promoted: true },
  { title: "Intratime", url: "https://www.intratime.es", redirect_url: "https://www.intratime.es", slug: "intratime", description: "Intratime es una solución integral de seguimiento de tiempo.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización", rank: 1, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Workia", url: "https://workia.io", redirect_url: "https://workia.io", slug: "workia", description: "Workia ofrece herramientas innovadoras de gestión de RRHH.", categories: "Control Horario", rank: 2, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Control Laboral", url: "https://controllaboral.es", redirect_url: "https://controllaboral.es", slug: "controllaboral", description: "Control Laboral proporciona cumplimiento legal y seguimiento de tiempo.", categories: "Control Horario", rank: 3, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Tramitapp", url: "https://www.tramitapp.com", redirect_url: "https://www.tramitapp.com", slug: "tramitapp", description: "Tramitapp, tu socio en la gestión de RRHH.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización;AI", rank: 4, isFree: false, isTopRated: true, verified: true, premium: true },
  { title: "TalentionTime", url: "https://talentiontime.com", redirect_url: "https://talentiontime.com", slug: "talentiontime", description: "TalentionTime simplifica los procesos de RRHH.", categories: "Control Horario", rank: 5, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Profesto", url: "https://profesto.io", redirect_url: "https://profesto.io", slug: "profesto", description: "Profesto, gestiona tus tareas de RRHH eficientemente.", categories: "Control Horario", rank: 6, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "HRLOG", url: "https://hrlog.es", redirect_url: "https://hrlog.es", slug: "hrlog", description: "HRLOG, la herramienta completa de gestión de RRHH.", categories: "Control Horario", rank: 7, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "CheckJC", url: "https://www.checkjc.com", redirect_url: "https://www.checkjc.com", slug: "checkjc", description: "CheckJC ofrece servicios de verificación y seguimiento de tiempo.", categories: "Control Horario", rank: 8, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Mi Registro Laboral", url: "https://www.miregistrolaboral.es", redirect_url: "https://www.miregistrolaboral.es", slug: "miregistrolaboral", description: "Mi Registro Laboral simplifica el registro horario de los empleados.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización", rank: 9, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "WorkMeter", url: "https://www.workmeter.com", redirect_url: "https://www.workmeter.com", slug: "workmeter", description: "WorkMeter mejora la productividad mediante la gestión efectiva del tiempo.", categories: "Control Horario", rank: 10, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Zeus Manager", url: "https://zeusmanager.com", redirect_url: "https://zeusmanager.com", slug: "zeusmanager", description: "Zeus Manager ofrece herramientas de gestión y seguimiento de tiempo.", categories: "Control Horario", rank: 11, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Taclia", url: "https://www.taclia.com", redirect_url: "https://www.taclia.com", slug: "taclia", description: "Taclia simplifica la gestión de recursos humanos con tecnología avanzada.", categories: "Control Horario", rank: 12, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Reloj Laboral", url: "https://www.relojlaboral.com", redirect_url: "https://www.relojlaboral.com", slug: "relojlaboral", description: "Reloj Laboral proporciona una solución de control de tiempo laboral.", categories: "Control Horario", rank: 13, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Niikiis", url: "https://www.niikiis.com", redirect_url: "https://www.niikiis.com", slug: "niikiis", description: "Niikiis es una plataforma intuitiva para la gestión de RRHH.", categories: "Control Horario", rank: 14, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Fichar en el Trabajo", url: "https://fichareneltrabajo.com", redirect_url: "https://fichareneltrabajo.com", slug: "fichareneltrabajo", description: "Fichar en el Trabajo, tu aliado para el cumplimiento horario.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización", rank: 15, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "eV4", url: "https://ev4erp.net/es", redirect_url: "https://ev4erp.net/es", slug: "ev4", description: "eV4, optimización de procesos empresariales con ERP.", categories: "Control Horario", rank: 16, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Zinkee", url: "https://www.zinkee.com", redirect_url: "https://www.zinkee.com", slug: "zinkee", description: "Zinkee, herramientas digitales para la gestión empresarial.", categories: "Control Horario", rank: 17, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "SimplyGest", url: "https://simplygest.es", redirect_url: "https://simplygest.es", slug: "simplygest", description: "SimplyGest, software de gestión para pequeñas y medianas empresas.", categories: "Control Horario", rank: 18, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Nominac Asesores", url: "https://nominac.com", redirect_url: "https://nominac.com", slug: "nominac", description: "Nominac Asesores, especialistas en nóminas y asesoría laboral.", categories: "Nóminas;Asesoría laboral", rank: 19, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "HV Asesores", url: "https://www.hvasesores.com", redirect_url: "https://www.hvasesores.com", slug: "hvasesores", description: "HV Asesores, expertos en asesoría fiscal y contabilidad.", categories: "Asesoría fiscal", rank: 20, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Integriapps", url: "https://integriapps.com", redirect_url: "https://integriapps.com", slug: "integriapps", description: "Integriapps optimiza la gestión del tiempo y recursos humanos.", categories: "Control Horario", rank: 21, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Oraculus", url: "https://oraculus.es", redirect_url: "https://oraculus.es", slug: "oraculus", description: "Oraculus, soluciones avanzadas en predicción y análisis.", categories: "Reportes", rank: 22, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Symphony Software", url: "https://symphonysoft.es", redirect_url: "https://symphonysoft.es", slug: "symphonysoft", description: "Symphony Software, tecnología avanzada para gestión empresarial.", categories: "Control Horario", rank: 23, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Imesd", url: "https://imesd.es", redirect_url: "https://imesd.es", slug: "imesd", description: "Imesd, especialistas en soluciones digitales y software a medida.", categories: "Control Horario;Software a medida;Integraciones API", rank: 24, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Viboal", url: "https://viboal.es", redirect_url: "https://viboal.es", slug: "viboal", description: "Viboal, software de gestión laboral y control de presencia.", categories: "Control Horario;Control de presencia", rank: 25, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Sesametime", url: "https://sesametime.com", redirect_url: "https://sesametime.com", slug: "sesametime", description: "Sesametime, innovación en la gestión del tiempo laboral.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización;Gestión de proyectos", rank: 26, isFree: false, isTopRated: true, verified: true, premium: true },
  { title: "Peoplerise", url: "https://peoplerise.net", redirect_url: "https://peoplerise.net", slug: "peoplerise", description: "Peoplerise, transformación digital en la gestión de personas.", categories: "Gestión de Talento", rank: 27, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "TimeReport", url: "https://timereport.es", redirect_url: "https://timereport.es", slug: "timereport", description: "TimeReport, precisión en el seguimiento y reporte del tiempo.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización", rank: 28, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Effiwork", url: "https://effiwork.com", redirect_url: "https://effiwork.com", slug: "effiwork", description: "Effiwork, eficiencia y productividad en la gestión del tiempo.", categories: "Control Horario", rank: 29, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "4Work", url: "https://4work.com", redirect_url: "https://4work.com", slug: "4work", description: "4Work, simplificando la gestión del tiempo y tareas en empresas.", categories: "Control Horario;Tareas", rank: 30, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Eficloud", url: "https://eficloud.org", redirect_url: "https://eficloud.org", slug: "eficloud", description: "Eficloud, la nube para eficientizar tus procesos empresariales.", categories: "Control Horario", rank: 31, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Effortime", url: "https://effortime.es", redirect_url: "https://effortime.es", slug: "effortime", description: "Effortime, control de tiempo laboral y gestión de proyectos.", categories: "Control Horario;Gestión de proyectos", rank: 32, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Laborplan", url: "https://laborplan.com", redirect_url: "https://laborplan.com", slug: "laborplan", description: "Laborplan, planificación y seguimiento del tiempo laboral.", categories: "Control Horario", rank: 33, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Tempos21", url: "https://tempos21.com", redirect_url: "https://tempos21.com", slug: "tempos21", description: "Tempos21, innovación en la gestión de tiempo y recursos.", categories: "Control Horario", rank: 34, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Woffu", url: "https://woffu.com", redirect_url: "https://woffu.com", slug: "woffu", description: "Woffu, soluciones para la gestión de vacaciones y ausencias.", categories: "Gestión de vacaciones;Ausencias", rank: 35, isFree: false, isTopRated: true, verified: true, premium: true },
  { title: "SesameHR", url: "https://sesamehr.com", redirect_url: "https://sesamehr.com", slug: "sesamehr", description: "SesameHR, revolucionando la gestión de recursos humanos.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización;Gestión de proyectos", rank: 36, isFree: false, isTopRated: true, verified: true, premium: true },
  { title: "DayTrack", url: "https://daytrack.es", redirect_url: "https://daytrack.es", slug: "daytrack", description: "DayTrack, seguimiento diario del rendimiento laboral.", categories: "Control Horario;Rendimiento laboral", rank: 37, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Noray", url: "https://noray.com", redirect_url: "https://noray.com", slug: "noray", description: "Noray, software de gestión empresarial con integración completa.", categories: "Control Horario", rank: 38, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Wofftime", url: "https://wofftime.com", redirect_url: "https://wofftime.com", slug: "wofftime", description: "Wofftime, herramientas avanzadas para el control de tiempo.", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización;Nóminas", rank: 39, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Task4Work", url: "https://task4work.com", redirect_url: "https://task4work.com", slug: "task4work", description: "Task4Work, la solución para la gestión de fuerzas de trabajo.", categories: "Control Horario", rank: 40, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Efectivus", url: "https://efectivus.com", redirect_url: "https://efectivus.com", slug: "efectivus", description: "Efectivus, sistema de control de empleados en tiempo real.", categories: "Control Horario", rank: 41, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Factorial", url: "https://factorialhr.es", redirect_url: "https://factorialhr.es", slug: "factorialhr", description: "Factorial, simplifica la gestión de RRHH con herramientas poderosas.", categories: "Control Horario;Gestión de Ausencias;Gestión de Vacaciones;Gestión de Talento;Geolocalización;Reconocimiento Facial;Nóminas;Gestión de proyectos;Gestión Documental;AI", rank: 42, isFree: true, isTopRated: true, verified: true, premium: true },
  { title: "Anviz", url: "https://anviz.com", redirect_url: "https://anviz.com", slug: "anviz", description: "Anviz, soluciones biométricas y control de acceso para empresas.", categories: "Control de Accesos", rank: 43, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Viboal Consulting", url: "https://viboalconsulting.com", redirect_url: "https://viboalconsulting.com", slug: "viboalconsulting", description: "Viboal Consulting, asesoría y soluciones en gestión empresarial.", categories: "Control Horario", rank: 44, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Tekus APP", url: "https://tekusapp.com", redirect_url: "https://tekusapp.com", slug: "tekusapp", description: "Tekus APP, innovación en la gestión y comunicación empresarial.", categories: "Control Horario", rank: 45, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Tempus Quality", url: "https://tempusquality.com", redirect_url: "https://tempusquality.com", slug: "tempusquality", description: "Tempus Quality, garantía de calidad y tiempo en tus procesos.", categories: "Control Horario", rank: 46, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "ControlSoft", url: "https://controlsoft.com", redirect_url: "https://controlsoft.com", slug: "controlsoft", description: "ControlSoft, software de gestión y control de tiempos laborales.", categories: "Control Horario", rank: 47, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "TimeWellScheduled", url: "https://timewellscheduled.com", redirect_url: "https://timewellscheduled.com", slug: "timewellscheduled", description: "TimeWellScheduled, planificación y gestión de horarios laborales.", categories: "Control Horario", rank: 48, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "TimeControl", url: "https://timecontrol.com", redirect_url: "https://timecontrol.com", slug: "timecontrol", description: "TimeControl, precisión en el control y gestión del tiempo laboral.", categories: "Control Horario", rank: 49, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "WorkForce Manager", url: "https://workforcemanager.com", redirect_url: "https://workforcemanager.com", slug: "workforcemanager", description: "WorkForce Manager, optimización de la gestión de fuerzas de trabajo.", categories: "Control Horario", rank: 50, isFree: false, isTopRated: false, verified: true, premium: true },
  { title: "Personio", url: "https://www.personio.es", redirect_url: "https://www.personio.es", slug: "personio", description: "Personio, Gestión integral de recursos humanos para pymes y empresas", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización;Gestión de proyectos", rank: 51, isFree: false, isTopRated: true, verified: false, premium: true },
  { title: "Bizneo", url: "https://www.bizneo.com/", redirect_url: "https://www.bizneo.com/", slug: "binzneo", description: "Bizneo, Software de recursos humanos y selección de personal", categories: "Control Horario", rank: 52, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Sage España", url: "https://www.sage.com/es-es/sage-business-cloud/hr/", redirect_url: "https://www.sage.com/es-es/sage-business-cloud/hr/", slug: "sagehr", description: "Sage HR, Solución de gestión de recursos humanos en la nube", categories: "Control Horario;Gestión de Turnos;Selección de Personal;Evaluación Desempeño;Portal del Empleado", rank: 53, isFree: false, isTopRated: true, verified: false, premium: true },
  { title: "Cezanne HR", url: "https://cezannehr.com/es/", redirect_url: "https://cezannehr.com/es/", slug: "cezannehr", description: "Cezanne HR, Gestión de recursos humanos y planificación laboral", categories: "Control Horario", rank: 54, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Nubhora", url: "https://www.nubhora.com/", redirect_url: "https://www.nubhora.com/", slug: "nubhora", description: "Nubhora, Control horario y gestión de ausencias", categories: "Control Horario", rank: 55, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Bixpe", url: "https://www.bixpe.com/", redirect_url: "https://www.bixpe.com/", slug: "bixpe", description: "Bixpe, Control horario y geolocalización de empleados", categories: "Control Horario;Reportes;Gestión de Ausencias;Apps;Geolocalización;Gratis", rank: 56, isFree: true, isTopRated: false, verified: false, premium: true },
  { title: "Timenet", url: "https://www.timenet.es/", redirect_url: "https://www.timenet.es/", slug: "timenet", description: "Timenet, Control horario y gestión de proyectos", categories: "Control Horario", rank: 57, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Quinyx", url: "https://www.quinyx.com/", redirect_url: "https://www.quinyx.com/", slug: "quinyx", description: "Quinyx, Gestión de personal y planificación laboral", categories: "Control Horario", rank: 58, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Talentia Software", url: "https://www.talentia-software.com/es/", redirect_url: "https://www.talentia-software.com/es/", slug: "talentia", description: "Talentia Software, Soluciones de gestión de talento y nómina", categories: "Control Horario", rank: 59, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "MHP SERVICIOS DE CONTROL, S.L.", url: "https://www.mhp.es/", redirect_url: "https://www.mhp.es/", slug: "mhp", description: "MHP Servicios de Control, Soluciones de control de accesos y seguridad", categories: "Control de Accesos;Control Horario;Gestión de Ausencias;Gestión de Vacaciones;Gestión de Turnos", rank: 60, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "ECOCOMPUTER S.L.", url: "https://www.ecocomputer.com/", redirect_url: "https://www.ecocomputer.com/", slug: "ecocomputer", description: "Ecocomputer, Soluciones informáticas de control y automatización", categories: "Control de Accesos", rank: 61, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "INFORMÁTICA DEL ESTE", url: "https://www.iest.com/", redirect_url: "https://www.iest.com/", slug: "iest", description: "Informática del Este, Soluciones informáticas para gestión empresarial", categories: "Control de Accesos", rank: 62, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "TECISA 74", url: "https://www.tecisa.com/", redirect_url: "https://www.tecisa.com/", slug: "tecisa", description: "TECISA 74, Soluciones de control horario y accesos", categories: "Control de Accesos", rank: 63, isFree: true, isTopRated: false, verified: false, premium: true },
  { title: "ZP INFORMATICA", url: "https://www.zpinformatica.com/control-presencial/", redirect_url: "https://www.zpinformatica.com/control-presencial/", slug: "zp", description: "ZP Informática, Soluciones de control horario y accesos", categories: "Control de Accesos", rank: 64, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "SISTEMAS DE TECNOLOGÍA APLICADA, S.L.U", url: "https://www.biosys.es/control-horario/", redirect_url: "https://www.biosys.es/control-horario/", slug: "biosys", description: "Sistemas de Tecnología Aplicada, Soluciones de control biométrico", categories: "Control de Accesos", rank: 65, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "EVELB TÉCNICAS Y SISTEMAS, S.L", url: "https://evelb.es/productos/tantice/", redirect_url: "https://evelb.es/productos/tantice/", slug: "tantice", description: "Evelb Técnicas y Sistemas, Control horario y gestión de accesos", categories: "Control de Accesos", rank: 66, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Soluciones 480", url: "https://checkingplan.com/software-control-horario-fichajes/", redirect_url: "https://checkingplan.com/software-control-horario-fichajes/", slug: "checkingplan", description: "Soluciones 480, Software de control horario y gestión de fichajes", categories: "Control Horario", rank: 67, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "LOGIC SOLUCIONES DE HARDWARE", url: "https://logicsh.es/desarrollo-web/portales-corporativos/fichanet", redirect_url: "https://logicsh.es/desarrollo-web/portales-corporativos/fichanet", slug: "fichanet", description: "Logic Soluciones de Hardware, Soluciones de fichaje y control horario", categories: "Control Horario", rank: 68, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "MF WINFOR SLU", url: "https://winfor.es/", redirect_url: "https://winfor.es/", slug: "winfor", description: "MF Winfor, Soluciones de gestión empresarial y control de accesos", categories: "Control de Accesos", rank: 69, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "UTE GREENAALL-SHS", url: "https://www.shsconsultores.es/", redirect_url: "https://www.shsconsultores.es/", slug: "shs", description: "UTE Greenaall-SHS, Soluciones de control de accesos y seguridad", categories: "Control de Accesos", rank: 71, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "PRIMION DIGITEK SLU", url: "https://www.primion.es/productos/sistemas-de-registro-de-tiempo/", redirect_url: "https://www.primion.es/productos/sistemas-de-registro-de-tiempo/", slug: "primion", description: "Primion Digitek, Sistemas de control de tiempo y accesos", categories: "Control de Accesos", rank: 72, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "KOMETASOFT, S.L.", url: "https://kometasoft.com/", redirect_url: "https://kometasoft.com/", slug: "kometasoft", description: "Kometasoft, Soluciones informáticas de gestión empresarial", categories: "Control Horario", rank: 73, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "ATM DOS, S.L.", url: "https://www.atm-maggioli.es/", redirect_url: "https://www.atm-maggioli.es/", slug: "atm", description: "ATM Dos, Soluciones de control horario y accesos", categories: "Control de Accesos", rank: 74, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "SISTEMAS DE DATOS, S.L.", url: "https://www.sdatos.com/", redirect_url: "https://www.sdatos.com/", slug: "sdatos", description: "Sistemas de Datos, Soluciones de control horario y accesos", categories: "Control de Accesos", rank: 75, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "PEIXE SOFTWARE S.L.", url: "https://www.grupocastilla.es/software-rrhh/registro-horario/", redirect_url: "https://www.grupocastilla.es/software-rrhh/registro-horario/", slug: "grupocastilla", description: "Peixe Software, Control horario y software de RRHH", categories: "Control Horario", rank: 77, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "OMESA INFORMATICA S.L.U.", url: "https://www.omesa.es/soluciones/BePress", redirect_url: "https://www.omesa.es/soluciones/BePress", slug: "bepress", description: "Omesa Informática, Soluciones de gestión de personal y control horario", categories: "Control Horario", rank: 78, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "AYESA ADVANCED TECHNOLOGY, S.A", url: "https://www.ayesa.com/", redirect_url: "https://www.ayesa.com/", slug: "ayesa", description: "Ayesa, Tecnología avanzada en soluciones de RRHH y control de accesos", categories: "Control Horario", rank: 79, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Atisoluciones Diseño de Sistemas", url: "https://www.atisoluciones.com/", redirect_url: "https://www.atisoluciones.com/", slug: "ati", description: "Atisoluciones Diseño de Sistemas, Soluciones informáticas de control", categories: "Control de Accesos", rank: 80, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "AQUIENMADRUGA, S.L", url: "https://pyv.technology/", redirect_url: "https://pyv.technology/", slug: "pyv", description: "AQUIENMADRUGA, Software de control horario y geolocalización", categories: "Control Horario", rank: 81, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Asintec Gestión SL", url: "https://checkingplan.com/software-control-horario-fichajes/", redirect_url: "https://checkingplan.com/software-control-horario-fichajes/", slug: "asintec-checkingplan", description: "Asintec Gestión, Software de control horario y fichajes", categories: "Control Horario", rank: 82, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "NETWORK SOLUTIONS CONTROL, S.L", url: "https://nscontrol.es/desarrollo-web/portales-corporativos/fichanet", redirect_url: "https://nscontrol.es/desarrollo-web/portales-corporativos/fichanet", slug: "nscontrol-fichanet", description: "Network Solutions Control, Soluciones de fichaje y control de accesos", categories: "Control de Accesos", rank: 83, isFree: true, isTopRated: false, verified: false, premium: true },
  { title: "SISTEMAS DIGITALES DE INFORMÁTICA, S.L", url: "https://www.sdi.es/", redirect_url: "https://www.sdi.es/", slug: "sdi", description: "Sistemas Digitales de Informática, Soluciones de control y fichaje", categories: "Control de Accesos", rank: 84, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Summar", url: "https://www.summar.es/software-recursos-humanos/", redirect_url: "https://www.summar.es/software-recursos-humanos/", slug: "summar", description: "Coordina el talento de las personas para mejorar la competividad de tu organización", categories: "Control Horario;Teletrabajo", rank: 85, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Beebole", url: "https://beebole.com/es/control-horario-gestion-proyectos/", redirect_url: "https://beebole.com/es/control-horario-gestion-proyectos/", slug: "beebole", description: "Con Beebole puedes crear informes de horas trabajadas de tus equipos, empleados y contratistas.", categories: "Control Horario", rank: 86, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Wolters Kluwer", url: "https://www.wolterskluwer.com/es-es/solutions/a3gestion-tiempo", redirect_url: "https://www.wolterskluwer.com/es-es/solutions/a3gestion-tiempo", slug: "a3gestiontiempo", description: "Software de gestión de presencia y registro de la jornada laboral", categories: "Control Horario", rank: 87, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Lunia", url: "https://lunia.es/soluciones-de-negocio/control-de-presencia/", redirect_url: "https://lunia.es/soluciones-de-negocio/control-de-presencia/", slug: "lunia", description: "fichajes, control horario y ausencias de los trabajadores. Adaptado 100% para el teletrabajo.", categories: "Control Horario", rank: 88, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Plain", url: "https://plain.ninja/", redirect_url: "https://plain.ninja/", slug: "plain", description: "Planificación de turnos con IA para equipos RRHH y operaciones", categories: "Control Horario;Automatizaciones;Mejor valoradas", rank: 89, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Evertime", url: "https://evercloud.es/evertime/", redirect_url: "https://evercloud.es/evertime/", slug: "evertime", description: "Cumplimiento del registro de la jornada laboral.", categories: "Control Horario", rank: 90, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Endalia", url: "https://www.endalia.com/", redirect_url: "https://www.endalia.com/", slug: "endalia", description: "Software de Recursos Humanos y Outsourcing de Nómina.", categories: "Control Horario;Nóminas;Selección de Personal;Canal de Denuncias;Evaluación Desempeño;Formación;Portal del Empleado", rank: 91, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Lucca", url: "https://www.lucca-software.es/gestion-del-desempeno", redirect_url: "https://www.lucca-software.es/gestion-del-desempeno", slug: "lucca", description: "Mide el rendimiento de tus empleados", categories: "Control Horario;Nóminas;Evaluación Desempeño;Formación;Portal del Empleado;Selección de Personal;Gestión de Turnos", rank: 92, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Exact Software", url: "https://www.exact.com/es/productos/rr-hh", redirect_url: "https://www.exact.com/es/productos/rr-hh", slug: "exact", description: "Software empresarial para tomar decisiones informadas.", categories: "Control Horario;Evaluación Desempeño;Formación;Portal del Empleado;Selección de Personal;Gestión de Turnos", rank: 93, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Natureh", url: "https://www.natureh.com/hm/Portal_trabajador", redirect_url: "https://www.natureh.com/hm/Portal_trabajador", slug: "natureh", description: "Eficiencia y agilidad en su gestión laboral con un portal web para sus trabajadores", categories: "Control Horario;Evaluación Desempeño;Formación;Portal del Empleado;Selección de Personal;Gestión de Turnos", rank: 94, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "PGPlanning", url: "https://www.pgplanning.es/", redirect_url: "https://www.pgplanning.es/", slug: "pgplanning", description: "Aplicación para organizar y generar turnos rotativos", categories: "Control Horario;Portal del Empleado;Selección de Personal;Gestión de Turnos;Nóminas", rank: 95, isFree: false, isTopRated: false, verified: false, premium: true },
  { title: "Zoho People", url: "https://www.zoho.com/es-xl/people/", redirect_url: "https://www.zoho.com/es-xl/people/", slug: "zohopeople", description: "Brinde experiencias excepcionales a los empleados", categories: "Control Horario;Nóminas;Selección de Personal;Canal de Denuncias;Evaluación Desempeño;Formación;Portal del Empleado", rank: 96, isFree: false, isTopRated: false, verified: false, premium: true },
];

// Category to feature boolean mapping
const categoryToFeatures = (cats: string): Record<string, boolean> => {
  const c = cats.toLowerCase();
  return {
    has_time_tracking: c.includes("control horario"),
    has_mobile_app: c.includes("apps"),
    has_geolocation: c.includes("geolocalización"),
    has_biometric: c.includes("biométric") || c.includes("reconocimiento facial"),
    has_absence_management: c.includes("ausencias") || c.includes("vacaciones"),
    has_shift_management: c.includes("turnos"),
    has_reports: c.includes("reportes"),
    has_api: c.includes("api"),
    has_remote_work: c.includes("teletrabajo"),
    has_ai: c.includes("ai"),
    has_employee_portal: c.includes("portal del empleado"),
    has_payroll: c.includes("nóminas"),
    has_geofence: c.includes("geofence"),
    has_project_management: c.includes("gestión de proyectos"),
    has_document_management: c.includes("gestión documental"),
    has_performance_eval: c.includes("evaluación desempeño") || c.includes("rendimiento"),
    has_recruitment: c.includes("selección de personal") || c.includes("talento"),
    has_training: c.includes("formación"),
    has_whistleblower: c.includes("canal de denuncias"),
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Step 1: Collect all unique categories
    const allCategories = new Set<string>();
    for (const sol of solutions) {
      sol.categories.split(";").map(c => c.trim()).filter(Boolean).forEach(c => allCategories.add(c));
    }

    // Remove non-category labels
    const skipLabels = new Set(["Gratis", "Mejor valoradas"]);
    const categoryNames = [...allCategories].filter(c => !skipLabels.has(c));

    // Step 2: Insert categories
    // Deduplicate by slug
    const slugMap = new Map<string, string>();
    const categoryRows: { name: string; slug: string; description: string }[] = [];
    for (const name of categoryNames) {
      const slug = name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      if (!slugMap.has(slug)) {
        slugMap.set(slug, name);
        categoryRows.push({ name, slug, description: `Soluciones de ${name}` });
      }
    }

    const { data: insertedCategories, error: catError } = await supabase
      .from("categories")
      .upsert(categoryRows, { onConflict: "name" })
      .select();

    if (catError) {
      console.error("Category insert error:", catError);
      throw catError;
    }

    console.log(`Inserted ${insertedCategories?.length} categories`);

    // Build category lookup map
    const categoryMap = new Map<string, string>();
    for (const cat of insertedCategories || []) {
      categoryMap.set(cat.name, cat.id);
    }

    // Step 3: Delete existing companies and insert fresh (to avoid conflicts)
    // First insert all solutions
    let insertedCount = 0;
    const solutionIds = new Map<string, string>();

    for (const sol of solutions) {
      const features = categoryToFeatures(sol.categories);
      
      // Check if slug already exists
      const { data: existing } = await supabase
        .from("companies")
        .select("id")
        .eq("slug", sol.slug)
        .maybeSingle();

      const companyData = {
        title: sol.title,
        slug: sol.slug,
        url: sol.url,
        redirect_url: sol.redirect_url,
        description: sol.description,
        rank: sol.rank,
        is_free: sol.isFree,
        is_top_rated: sol.isTopRated,
        verified: sol.verified,
        is_premium: sol.premium,
        is_promoted: sol.is_promoted || false,
        img_url: "https://ucarecdn.com/d0fa8072-e20e-49a6-8496-3f003577b88b/",
        logo_url: "https://unicorn-cdn.b-cdn.net/5c70ff16-1683-4ad6-b2ac-a999843b1e04/",
        type: sol.isFree ? "free-premium" : "premium",
        ...features,
      };

      if (existing) {
        // Update existing
        const { error: updateErr } = await supabase
          .from("companies")
          .update(companyData)
          .eq("id", existing.id);
        if (updateErr) console.error(`Update error for ${sol.title}:`, updateErr);
        solutionIds.set(sol.slug, existing.id);
      } else {
        // Insert new
        const { data: newRow, error: insertErr } = await supabase
          .from("companies")
          .insert(companyData)
          .select("id")
          .single();
        if (insertErr) {
          console.error(`Insert error for ${sol.title}:`, insertErr);
          continue;
        }
        solutionIds.set(sol.slug, newRow.id);
      }
      insertedCount++;
    }

    console.log(`Processed ${insertedCount} solutions`);

    // Step 4: Create solution_categories relationships
    const junctionRows: { solution_id: string; category_id: string }[] = [];
    for (const sol of solutions) {
      const solId = solutionIds.get(sol.slug);
      if (!solId) continue;

      const cats = sol.categories.split(";").map(c => c.trim()).filter(Boolean);
      for (const catName of cats) {
        if (skipLabels.has(catName)) continue;
        const catId = categoryMap.get(catName);
        if (catId) {
          junctionRows.push({ solution_id: solId, category_id: catId });
        }
      }
    }

    if (junctionRows.length > 0) {
      const { error: juncError } = await supabase
        .from("solution_categories")
        .upsert(junctionRows, { onConflict: "solution_id,category_id" });

      if (juncError) {
        console.error("Junction insert error:", juncError);
      } else {
        console.log(`Inserted ${junctionRows.length} solution-category relationships`);
      }
    }

    return new Response(
      JSON.stringify({
        message: "Import completed",
        solutions: insertedCount,
        categories: categoryNames.length,
        relationships: junctionRows.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Import error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
