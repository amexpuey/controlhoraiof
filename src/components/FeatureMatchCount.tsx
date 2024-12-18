interface FeatureMatchCountProps {
  matchingFeaturesCount: number;
  totalSelectedFeatures: number;
}

export default function FeatureMatchCount({ matchingFeaturesCount, totalSelectedFeatures }: FeatureMatchCountProps) {
  if (totalSelectedFeatures === 0) return null;
  
  return (
    <div className="text-center mb-6">
      <div className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-lg text-lg font-medium">
        {matchingFeaturesCount} de {totalSelectedFeatures} características seleccionadas
      </div>
    </div>
  );
}