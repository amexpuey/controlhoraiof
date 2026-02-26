import React from "react";
import { Download, ExternalLink, Pencil, Book, Clock, FileText, Users, Calendar, MessageSquare, GraduationCap, Briefcase } from "lucide-react";
import { TemplateData } from "./types";
import { Link } from "react-router-dom";

interface TemplateCardProps {
  template: TemplateData;
  onAction?: () => void;
}

export default function TemplateCard({ template, onAction }: TemplateCardProps) {
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

  const isComingSoon = template.action === "download" && template.id !== "registro-horas-trabajadas";

  const renderAction = () => {
    if (isComingSoon) {
      return (
        <span className="btn btn-outline" style={{ opacity: 0.5, cursor: 'default', width: '100%', justifyContent: 'center' }}>
          <Clock className="h-4 w-4" /> Próximamente
        </span>
      );
    }
    if (template.action === "download") {
      return onAction ? (
        <button className="btn btn-green" style={{ width: '100%' }} onClick={onAction}>
          <Download className="h-4 w-4" /> {template.actionLabel}
        </button>
      ) : (
        <a href={template.downloadUrl} download className="btn btn-green" style={{ width: '100%' }}>
          <Download className="h-4 w-4" /> {template.actionLabel}
        </a>
      );
    }
    return (
      <Link to={template.editUrl || "#"} className="btn btn-green" style={{ width: '100%' }}>
        <Pencil className="h-4 w-4" /> {template.actionLabel}
      </Link>
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
        {isComingSoon && (
          <span className="chip" style={{ fontSize: '11px', padding: '3px 10px', background: 'var(--yellow-bg)', borderColor: 'var(--yellow)', color: 'var(--yellow)' }}>
            Próximamente
          </span>
        )}
      </div>
      
      <div className="feature-body" style={{ flex: 1 }}>
        <h3 style={{ fontSize: '16px', lineHeight: '1.3' }}>{template.title}</h3>
        <p style={{ fontSize: '13.5px' }}>{template.description}</p>
      </div>
      
      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {renderAction()}
        {template.exampleLink && !isComingSoon && template.id !== "registro-horas-trabajadas" && (
          <a href={template.exampleLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', fontSize: '13px' }}>
            <ExternalLink className="h-3 w-3" /> Ver ejemplo
          </a>
        )}
      </div>
    </div>
  );
}
