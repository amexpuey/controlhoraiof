import { ExternalLink, Globe, Apple, Smartphone } from "lucide-react";

interface AppCardTitleProps {
  title: string;
  logoUrl: string;
  platforms?: string[];
  url: string;
}

export function AppCardTitle({ title, logoUrl, platforms, url }: AppCardTitleProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'web':
        return <Globe className="w-4 h-4" />;
      case 'ios':
        return <Apple className="w-4 h-4" />;
      case 'android':
        return <Smartphone className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <img
          src={logoUrl}
          alt={`${title} logo`}
          className="w-12 h-12 rounded-lg object-contain"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {platforms?.map((platform) => (
              <span key={platform} className="text-gray-600">
                {getPlatformIcon(platform)}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <a
        href={url}
        onClick={(e) => e.stopPropagation()}
        className="text-blue-600 hover:text-blue-800"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExternalLink className="w-5 h-5" />
      </a>
    </div>
  );
}