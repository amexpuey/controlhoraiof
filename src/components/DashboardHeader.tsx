import FeatureMatchCount from "./FeatureMatchCount";

interface DashboardHeaderProps {
  matchingFeaturesCount?: number;
  totalSelectedFeatures?: number;
}

export default function DashboardHeader({ matchingFeaturesCount = 0, totalSelectedFeatures = 0 }: DashboardHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-primary-900 mb-4">
        Aplicaciones Recomendadas
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Basado en tus necesidades, estas son las mejores soluciones para tu empresa
      </p>
      <FeatureMatchCount 
        matchingFeaturesCount={matchingFeaturesCount}
        totalSelectedFeatures={totalSelectedFeatures}
      />
    </div>
  );
}