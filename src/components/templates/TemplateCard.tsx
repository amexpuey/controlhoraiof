
import React, { useMemo } from "react";
import { Download, ExternalLink, Pencil, Book, Clock, FileText, Users, Calendar, MessageSquare, GraduationCap, Briefcase, Play, Link2 } from "lucide-react";
import { TemplateData, TemplateAction } from "./types";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  template: TemplateData;
  /** If true, this template has a real PDF from Supabase */
  isPublished?: boolean;
  onLeadGate?: (template: TemplateData) => void;
}

export default function TemplateCard({ template, isPublished, onLeadGate }: TemplateCardProps) {
  // Simulated download count with daily micro-increment for realism
  const displayDownloads = useMemo(() => {
    const base = template.baseDownloads || 0;
    if (!base) return null;
    const daysSinceEpoch = Math.floor(Date.now() / 86400000);
    const hash = template.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const dailyIncrement = ((daysSinceEpoch + hash) % 7) + 1;
    const dayOffset = daysSinceEpoch % 365;
    return base + (dayOffset * dailyIncrement);
  }, [template.baseDownloads, template.id]);

  const formatDownloads = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}k`;
    return n.toString();
  };

  const getCategoryIcon = () => {
    const iconMap: Record<string, React.ReactNode> = {
      "Evaluación": <FileText className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Control horario": <Clock className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Formación": <GraduationCap className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Comunicación Interna": <MessageSquare className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Normativa Laboral": <Briefcase className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Onboarding": <Users className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Productividad": <Calendar className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Documentos Legales": <FileText className="h-7 w-7" style={{ color: 'var(--green)' }} />,
      "Turnos": <Clock className="h-7 w-7" style={{ color: 'var(--green)' }} />,
    };
    return iconMap[template.category] || <Book className="h-7 w-7" style={{ color: 'var(--green)' }} />;
  };

  const getTypeBadge = () => {
    const config: Record<TemplateAction, { label: string; bg: string; border: string; color: string }> = {
      edit: { label: "Herramienta online", bg: "hsla(199, 89%, 48%, 0.1)", border: "hsla(199, 89%, 48%, 0.3)", color: "hsl(199, 89%, 38%)" },
      download: { label: "Descarga", bg: "var(--green-bg)", border: "hsla(152, 60%, 40%, 0.3)", color: "hsl(152, 60%, 32%)" },
      external: { label: "Enlace externo", bg: "hsla(270, 50%, 50%, 0.1)", border: "hsla(270, 50%, 50%, 0.3)", color: "hsl(270, 50%, 40%)" },
    };
    const c = config[template.action];
    return (
      <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '999px', background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontWeight: 600, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
        {c.label}
      </span>
    );
  };

  // A template is "coming soon" if it's a download type AND not published in Supabase
  const isComingSoon = template.action === "download" && !isPublished;

  const handleClick = () => {
    if (onLeadGate) {
      onLeadGate(template);
    }
  };

  const renderAction = () => {
    if (isComingSoon) {
      return (
        <span className="btn btn-outline" style={{ opacity: 0.5, cursor: 'default', width: '100%', justifyContent: 'center' }}>
          <Clock className="h-4 w-4" /> Próximamente
        </span>
      );
    }

    if (template.action === "download" && isPublished) {
      return (
        <button onClick={handleClick} className="btn btn-outline" style={{ width: '100%', borderColor: 'hsl(152, 60%, 40%)', color: 'hsl(152, 60%, 32%)' }}>
          <Download className="h-4 w-4" /> {template.actionLabel || "Descargar gratis"}
        </button>
      );
    }

    if (template.action === "external") {
      return (
        <button onClick={handleClick} className="btn btn-outline" style={{ width: '100%', borderColor: 'hsl(270, 50%, 50%)', color: 'hsl(270, 50%, 40%)' }}>
          <Link2 className="h-4 w-4" /> {template.actionLabel}
        </button>
      );
    }

    // Interactive / edit → primary green button
    return (
      <button onClick={handleClick} className="btn btn-green" style={{ width: '100%' }}>
        <Play className="h-4 w-4" /> {template.actionLabel}
      </button>
    );
  };
  return (
    <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: 'var(--radius-xs)', 
          background: 'var(--green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          {getCategoryIcon()}
        </div>
        <span className="chip" style={{ fontSize: '11px', padding: '3px 10px' }}>
          {template.category}
        </span>
        {getTypeBadge()}
        {isComingSoon && (
          <span className="chip" style={{ fontSize: '11px', padding: '3px 10px', background: 'var(--yellow-bg)', borderColor: 'var(--yellow)', color: 'var(--yellow)' }}>
            Próximamente
          </span>
        )}
      </div>
      
      <div className="feature-body" style={{ flex: 1 }}>
        <Link to={`/plantillas/${template.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ fontSize: '16px', lineHeight: '1.3' }}>{template.title}</h3>
        </Link>
        <p style={{ fontSize: '13.5px' }}>{template.description}</p>
        {displayDownloads && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <Download className="h-3 w-3" />
            <span>{formatDownloads(displayDownloads)} descargas</span>
          </div>
        )}
      </div>
      
      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderAction()}
      </div>
    </div>
  );
}
