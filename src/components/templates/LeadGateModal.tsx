
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email("Introduce un email válido").max(255);

interface LeadGateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateTitle: string;
  templateSlug: string;
  templateImage?: string;
  templateDescription?: string;
  /** URL to open after submit. If not provided, onAfterSubmit is called instead */
  pdfUrl?: string;
  /** Called after successful submit when no pdfUrl */
  onAfterSubmit?: () => void;
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
}

export default function LeadGateModal({
  open,
  onOpenChange,
  templateTitle,
  templateSlug,
  templateImage,
  templateDescription,
  pdfUrl,
  onAfterSubmit,
}: LeadGateModalProps) {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setEmailError(parsed.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const utm = getUtmParams();

      // 1. Insert lead
      await supabase.from("plantilla_leads").insert({
        email: parsed.data,
        nombre: nombre.trim() || null,
        empresa: empresa.trim() || null,
        plantilla_slug: templateSlug,
        source: "fichajeempresas.es",
        ...utm,
      } as any);

      // 2. Notify edge function (fire & forget)
      supabase.functions.invoke('notify-template-lead', {
        body: {
          email: parsed.data,
          nombre: nombre.trim(),
          empresa: empresa.trim(),
          plantilla_slug: templateSlug,
          plantilla_title: templateTitle,
        },
      }).catch(() => {});

      // 3. Increment download count (fire & forget)
      supabase.rpc("increment_download_count", { template_slug: templateSlug } as any).then(() => {});

      // 4. Open PDF or execute action
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
      } else if (onAfterSubmit) {
        onAfterSubmit();
      }

      // 5. Toast
      toast({
        title: "¡Descarga iniciada!",
        description: "Revisa tu email para más recursos.",
      });

      // Reset & close
      setEmail("");
      setNombre("");
      setEmpresa("");
      onOpenChange(false);
    } catch (err) {
      console.error("Lead gate error:", err);
      toast({
        title: "Error",
        description: "Hubo un problema. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" style={{ borderRadius: 'var(--radius-sm)', padding: 0, overflow: 'hidden' }}>
        {/* Preview section */}
        {templateImage && (
          <div style={{ 
            background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--accent)) 100%)',
            padding: '20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            borderBottom: '1px solid hsl(var(--border))'
          }}>
            <img 
              src={templateImage} 
              alt={`Preview de ${templateTitle}`}
              style={{ 
                width: '80px', 
                height: '100px', 
                objectFit: 'cover', 
                borderRadius: '6px',
                border: '1px solid hsl(var(--border))',
                background: 'white',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }} 
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'hsl(var(--foreground))', 
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: '8px'
              }}>
                {templateTitle}
              </p>
              {templateDescription && (
                <p style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.4, marginBottom: '8px' }}>
                  {templateDescription}
                </p>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {["Lista para usar, sin edición", "Adaptada a normativa española", "Formato profesional"].map((item) => (
                  <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'hsl(var(--muted-foreground))' }}>
                    <CheckCircle2 className="h-3 w-3" style={{ color: '#0fb89f', flexShrink: 0 }} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: '24px' }}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: '18px', lineHeight: '1.4' }}>
              {templateImage ? 'Accede gratis a este recurso' : `Descarga gratuita: ${templateTitle}`}
            </DialogTitle>
          </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email *</Label>
            <Input
              id="lead-email"
              type="email"
              required
              placeholder="tu@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: emailError ? 'hsl(0, 70%, 50%)' : undefined }}
            />
            {emailError && (
              <p style={{ color: 'hsl(0, 70%, 50%)', fontSize: '12px' }}>{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-nombre">Nombre</Label>
            <Input
              id="lead-nombre"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead-empresa">Empresa</Label>
            <Input
              id="lead-empresa"
              type="text"
              placeholder="Nombre de tu empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              maxLength={100}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{ background: '#0fb89f', color: '#fff', height: '44px', fontSize: '15px' }}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Descargar ahora
          </Button>

          <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.4' }}>
            Recibirás recursos de RRHH útiles. Puedes darte de baja en cualquier momento.
          </p>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
