import { Globe, Apple, Smartphone } from "lucide-react";

interface AppCardTitleProps {
  title: string;
  platforms?: string[];
  url?: string;
}

export function AppCardTitle({ 
  title,
  platforms,
  url
}: AppCardTitleProps) {
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
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>
      {platforms && platforms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {getPlatformIcon(platform)}
              {platform}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}