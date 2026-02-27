import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { trackVote } from "@/lib/analytics";

interface VoteButtonProps {
  companyId: string;
  votes: number | null;
}

export default function VoteButton({ companyId, votes = 0 }: VoteButtonProps) {
  const [currentVotes, setCurrentVotes] = useState(votes || 0);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  const handleVote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVoting(true);

    try {
      const { error } = await supabase
        .from('companies')
        .update({ votes: currentVotes + 1 })
        .eq('id', companyId);

      if (error) throw error;

      setCurrentVotes(prev => prev + 1);
      trackVote(companyId);
      toast({
        title: "¡Gracias por tu voto!",
        description: "Tu opinión nos ayuda a mejorar.",
      });
    } catch (error) {
      toast({
        title: "Error al votar",
        description: "Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleVote}
      disabled={isVoting}
      className="flex items-center gap-2"
    >
      <ThumbsUp className="w-4 h-4" />
      <span>{currentVotes}</span>
    </Button>
  );
}