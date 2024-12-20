import { useArticles } from "@/hooks/useArticles";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Blog() {
  const { data: articles, isLoading } = useArticles();

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-[400px] w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  const publishedArticles = articles?.filter((article) => article.status === "published") || [];
  const [latestArticle, ...otherArticles] = publishedArticles;

  if (!latestArticle) {
    return (
      <div className="container py-8">
        <p className="text-center text-gray-500">No articles published yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <Card className="relative overflow-hidden">
            {latestArticle.featured_image_url && (
              <div className="relative h-[400px] w-full">
                <img
                  src={latestArticle.featured_image_url}
                  alt={latestArticle.image_alt || ""}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}
            <CardContent className={`${latestArticle.featured_image_url ? 'absolute bottom-0 left-0 right-0 text-white' : ''} p-6`}>
              <div className="mb-2 text-sm">
                {format(new Date(latestArticle.created_at || new Date()), "MMMM d, yyyy")} • Un tío legal
              </div>
              <CardTitle className="text-3xl md:text-4xl mb-4">
                {latestArticle.title}
              </CardTitle>
              <p className="text-lg opacity-90">
                {latestArticle.meta_description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Other Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              {article.featured_image_url && (
                <div className="relative h-48">
                  <img
                    src={article.featured_image_url}
                    alt={article.image_alt || ""}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="mb-2 text-sm text-muted-foreground">
                  {format(new Date(article.created_at || new Date()), "MMMM d, yyyy")} • Un tío legal
                </div>
                <CardTitle className="mb-2">{article.title}</CardTitle>
                <p className="text-muted-foreground line-clamp-2">
                  {article.meta_description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
