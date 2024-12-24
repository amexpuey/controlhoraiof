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
    // First, get all highlighted features that exist in the app's features
    const highlightedMatches = features.filter(f => highlightedFeatures.includes(f));
    
    // Then, get non-highlighted features
    const nonHighlighted = features.filter(f => !highlightedFeatures.includes(f));
    
    // Calculate how many non-highlighted features we can show
    const remainingSlots = Math.max(0, 5 - highlightedMatches.length);
    
    // Combine highlighted features with remaining non-highlighted features
    return [
      ...highlightedMatches,
      ...nonHighlighted.slice(0, remainingSlots)
    ];
  };

  const displayFeatures = getDisplayFeatures();
  const totalFeatures = features.length;
  const hiddenFeaturesCount = Math.max(0, totalFeatures - 5);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {displayFeatures.map((feature, index) => renderFeature(feature, index))}
      {hiddenFeaturesCount > 0 && (
        <span className="text-gray-500 text-sm">
          +{hiddenFeaturesCount} más
        </span>
      )}
    </div>
  );
}