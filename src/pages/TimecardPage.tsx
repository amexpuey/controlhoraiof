
import React from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Clock, Shield, Smartphone, ExternalLink, CheckCircle } from "lucide-react";
import InwoutBlogCTA from "@/components/blog/InwoutBlogCTA";

export default function TimecardPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--white)' }}>
      <AppHeader />

      {/* Hero */}
      <div className="hero" style={{ padding: '56px 0 48px' }}>
        <div className="container">
          <div className="s-center">
            <Link to="/plantillas" className="inline-flex items-center gap-2 text-sm mb-6" style={{ color: 'rgba(255,255,255,.6)' }}>
              <ArrowLeft className="h-4 w-4" /> Volver a plantillas
            </Link>
            <div className="s-head">
              <div className="kicker" style={{ margin: '0 auto 20px' }}>
                <span className="kicker-dot" />
                Control horario
              </div>
              <h1>Registro de horas trabajadas</h1>
              <p className="lead" style={{ margin: '0 auto 28px' }}>
                Controla las horas laborales de tu equipo cumpliendo con la normativa vigente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '64px', maxWidth: '720px' }}>

        {/* Alert: resource no longer available */}
        <div className="glass" style={{ 
          padding: '28px 32px', marginBottom: '32px',
          borderLeft: '4px solid var(--green)',
          background: 'var(--green-bg)'
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
              background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AlertTriangle className="h-5 w-5" style={{ color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>
                Recurso no disponible en formato Excel
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
                Desde la entrada en vigor de los <strong>nuevos requisitos técnicos del RD 1060/2022</strong>, los registros 
                horarios deben realizarse mediante <strong>medios digitales que garanticen la inalterabilidad, 
                trazabilidad y accesibilidad</strong> de los datos. Las plantillas en Excel o papel 
                <strong> ya no son válidas</strong> como sistema de registro horario.
              </p>
            </div>
          </div>
        </div>

        {/* What the law requires */}
        <div className="glass" style={{ padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
            ¿Qué exige la normativa actual?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: Shield, title: "Inalterabilidad", desc: "Los registros no pueden ser modificados una vez fichados. Excel permite edición libre." },
              { icon: Clock, title: "Trazabilidad", desc: "Debe quedar constancia de quién ficha, cuándo y desde dónde. Con geolocalización o IP." },
              { icon: Smartphone, title: "Accesibilidad digital", desc: "El sistema debe ser accesible para empleados e inspección en todo momento, desde cualquier dispositivo." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon className="h-4 w-4" style={{ color: 'var(--green)' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{title}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="glass" style={{ padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Nuestra recomendación
            </span>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
            INWOUT: registro horario digital gratuito
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
            Tras analizar decenas de soluciones de fichaje digital en nuestro directorio, recomendamos 
            <strong> INWOUT</strong> como la opción más accesible para PYMEs. Ofrece un <strong>plan gratuito 
            permanente para hasta 5 empleados</strong>, cumpliendo todos los requisitos legales: 
            geolocalización, inalterabilidad de registros y acceso desde app móvil y web.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {[
              "Plan gratuito para hasta 5 empleados",
              "App móvil + web con geolocalización",
              "Registros inalterables y con trazabilidad",
              "Cumple RD 1060/2022 y Ley de Fichaje",
              "Alta en menos de 2 minutos",
            ].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <CheckCircle className="h-4 w-4" style={{ color: 'var(--green)', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>

          <a
            href="https://inwout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Crear cuenta gratis en INWOUT <ExternalLink className="h-4 w-4" />
          </a>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
            Sin tarjeta de crédito · Activación inmediata · Gratis para siempre hasta 5 empleados
          </p>
        </div>

        {/* Legal quickstart */}
        <div className="glass" style={{ padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
            Configura tu marco legal en minutos
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
            Antes de empezar a fichar, necesitas establecer el marco legal correcto: comunicado a los 
            trabajadores, acuerdo con la representación legal y protocolo de registro. Usa nuestro 
            asistente guiado para generarlo todo automáticamente.
          </p>
          <a
            href="https://comunicado-legal.inwout.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Generar documentación legal <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <InwoutBlogCTA variant="footer" />
      </div>
    </div>
  );
}
