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
            <span
              key={index}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
            >
              {platform}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}