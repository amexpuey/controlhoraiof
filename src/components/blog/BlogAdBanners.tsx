
import AdBanner from "@/components/ads/AdBanner";

export default function BlogAdBanners() {
  return (
    <>
      <div className="flex justify-center mb-8">
        <AdBanner position="top" adSize="728x90" />
      </div>
      
      <div className="flex justify-center my-10">
        <AdBanner position="in-content" adSize="300x250" />
      </div>
      
      <div className="flex justify-center mt-10">
        <AdBanner position="bottom" adSize="728x90" />
      </div>
    </>
  );
}
