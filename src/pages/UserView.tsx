import { useParams, useNavigate } from "react-router-dom";
import { useCompany } from "@/hooks/useCompanies";
import { ArrowLeft, Globe, Users, Clock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

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
            onClick={() => navigate("/admin")}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with background image */}
      <div 
        className="h-[300px] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${company.img_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70">
          <div className="container mx-auto px-4 h-full flex items-end pb-8">
            <div className="flex items-center gap-6">
              <img
                src={company.logo_url}
                alt={company.title}
                className="w-24 h-24 rounded-xl border-4 border-white shadow-lg"
              />
              <div className="text-white">
                <h1 className="text-4xl font-bold mb-2">{company.title}</h1>
                <div className="flex items-center gap-2">
                  {company.verified && (
                    <span className="bg-blue-500/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  )}
                  <span className="bg-purple-500/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {company.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="absolute top-4 left-4 text-white flex items-center gap-2 hover:bg-black/20 px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Admin
        </button>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{company.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.features?.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {Array.isArray(company.highlights) && company.highlights.length > 0 && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-green-500 mt-1" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Pricing</h3>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-blue-600">
                  {company.pricing_starting_price === 0 
                    ? "Free"
                    : `${company.pricing_starting_price}${company.pricing_currency}/${company.pricing_billing_period}`}
                </div>
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  Visit Website
                </a>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{company.votes} users have voted</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}