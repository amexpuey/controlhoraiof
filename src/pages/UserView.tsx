import { useParams, useNavigate } from "react-router-dom";
import { useCompany } from "@/hooks/useCompanies";
import { AppHeader } from "@/components/user-view/AppHeader";
import { AboutSection } from "@/components/user-view/AboutSection";
import { FeaturesSection } from "@/components/user-view/FeaturesSection";
import { HighlightsSection } from "@/components/user-view/HighlightsSection";
import { Sidebar } from "@/components/user-view/Sidebar";

export default function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: company, isLoading, error } = useCompany(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">App not found</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader company={company} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AboutSection company={company} />
            <FeaturesSection company={company} />
            <HighlightsSection company={company} />
          </div>
          <Sidebar company={company} />
        </div>
      </div>
    </div>
  );
}