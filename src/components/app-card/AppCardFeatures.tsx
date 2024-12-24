import { Check } from "lucide-react";

interface AppCardFeaturesProps {
  features: string[];
  highlightedFeatures: string[];
}

export function AppCardFeatures({ features, highlightedFeatures }: AppCardFeaturesProps) {
  const renderFeature = (feature: string, index: number) => {
    const isHighlighted = highlightedFeatures.includes(feature);
    
    if (isHighlighted) {
      return (
        <span
          key={index}
          className="flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
        >
          <Check className="w-4 h-4" />
          {feature}
        </span>
      );
    }

    return (
      <span
        key={index}
        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
      >
        {feature}
      </span>
    );
  };

  const getDisplayFeatures = () => {
    const highlightedCount = features.filter(f => highlightedFeatures.includes(f)).length;
    const remainingSlots = 5 - highlightedCount;
    
    const highlighted = features.filter(f => highlightedFeatures.includes(f));
    const nonHighlighted = features.filter(f => !highlightedFeatures.includes(f));
    
    return [
      ...highlighted,
      ...nonHighlighted.slice(0, remainingSlots)
    ];
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {getDisplayFeatures().map((feature, index) => renderFeature(feature, index))}
      {features.length > 5 && (
        <span className="text-gray-500 text-sm">
          +{features.length - 5} más
        </span>
      )}
    </div>
  );
}