import { Award, CheckCircle } from "lucide-react";

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
      <div className="absolute top-4 right-4 flex gap-2">
        {verified && (
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Verificado
          </span>
        )}
        {isTopRated && (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Award className="w-4 h-4" />
            Top Rated
          </span>
        )}
      </div>
      <div className="absolute -bottom-8 left-6 flex flex-col items-center">
        <img
          src={logoUrl}
          alt={`${title} logo`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <span className="text-sm font-medium text-gray-900 mt-2">{title}</span>
      </div>
    </div>
  );
}