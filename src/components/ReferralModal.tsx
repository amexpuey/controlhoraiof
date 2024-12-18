import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
  referralCount?: number;
}

export function ReferralModal({ isOpen, onClose, referralCode, referralCount = 0 }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("¡Enlace copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Error al copiar el enlace");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Comparte y desbloquea</DialogTitle>
          <DialogDescription>
            Comparte tu enlace de referido. Cuando alguien se registre con tu enlace, 
            desbloquearás acceso completo a todas las aplicaciones.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={referralLink}
              readOnly
              className="flex-1"
            />
            <Button 
              size="icon"
              onClick={handleCopy}
              variant="outline"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-sm text-gray-500 text-center">
            Referidos actuales: {referralCount}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}