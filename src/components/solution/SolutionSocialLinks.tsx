import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

const labelMap: Record<string, string> = {
  facebook: 'Facebook',
  twitter: 'Twitter / X',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

interface SolutionSocialLinksProps {
  social: Record<string, string>;
}

export function SolutionSocialLinks({ social }: SolutionSocialLinksProps) {
  const entries = Object.entries(social).filter(([, url]) => url && url.trim());

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([platform, url]) => {
        const Icon = iconMap[platform];
        if (!Icon) return null;
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)' }}
            title={labelMap[platform] || platform}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{labelMap[platform] || platform}</span>
          </a>
        );
      })}
    </div>
  );
}
