
import AdBanner from "@/components/ads/AdBanner";

interface DashboardAdBannersProps {
  position: "top" | "bottom";
}

export function DashboardAdBanners({ position }: DashboardAdBannersProps) {
  return (
    <div className="my-4 flex justify-center">
      <AdBanner 
        position={position}
        adSize="728x90"
      />
    </div>
  );
}
