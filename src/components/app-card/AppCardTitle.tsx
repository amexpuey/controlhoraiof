import { Monitor, Phone, Globe } from "lucide-react";

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
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'ios':
      case 'android':
        return <Phone className="w-4 h-4 text-blue-500" />;
      default:
        return <Monitor className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>
      {platforms && platforms.length > 0 && (
        <div className="flex gap-2">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="flex items-center gap-1"
              title={platform}
            >
              {getPlatformIcon(platform)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}