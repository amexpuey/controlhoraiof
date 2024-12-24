import { Badge } from "@/components/ui/badge";

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
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>
      {platforms && platforms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs"
            >
              {platform}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}