
import React from "react";
import { Download, FileText } from "lucide-react";

interface DownloadButtonProps {
  downloadAttempted: boolean;
  handleDownload: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  downloadAttempted, 
  handleDownload 
}) => {
  return (
    <div>
      {!downloadAttempted ? (
        <button className="btn btn-green btn-lg" onClick={handleDownload}>
          <Download className="h-5 w-5" /> Descargar Guía en PDF
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: 'var(--green-bg)', 
            color: 'var(--green-dark)', 
            padding: '10px 20px', 
            borderRadius: 'var(--radius-xs)',
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '14px',
            fontWeight: 500
          }}>
            <FileText className="h-5 w-5" />
            Guía interactiva disponible a continuación
          </div>
          <button className="btn btn-outline" onClick={handleDownload}>
            <Download className="h-4 w-4" /> Intentar descargar nuevamente
          </button>
        </div>
      )}
    </div>
  );
};
