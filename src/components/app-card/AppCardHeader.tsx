
interface AppCardHeaderProps {
  imgUrl: string;
  logoUrl: string;
  title: string;
  verified: boolean;
  isTopRated: boolean;
}

export function AppCardHeader({ imgUrl, logoUrl, title, verified, isTopRated }: AppCardHeaderProps) {
  return (
    <div className="relative h-48 overflow-hidden">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute -bottom-12 left-6 flex flex-col items-center">
        <img
          src={logoUrl}
          alt={`${title} logo`}
          className="w-16 h-16 rounded-full object-cover p-1"
        />
        <span className="text-sm font-medium text-gray-900 mt-3">{title}</span>
      </div>
    </div>
  );
}