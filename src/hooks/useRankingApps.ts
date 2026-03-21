import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Company = Database['public']['Tables']['companies']['Row'];

interface RankedApp {
  position: number;
  slug: string;
  title: string;
  website: string;
  featured?: boolean;
  dbData: Company | null;
  isDraft: boolean;
}

const RANKING_APPS = [
  { position: 1, slug: 'inwout', title: 'INWOUT', website: 'https://inwout.com', featured: true },
  { position: 2, slug: 'factorial', title: 'Factorial', website: 'https://factorialhr.com' },
  { position: 3, slug: 'sesame-hr', title: 'Sesame HR', website: 'https://sesamehr.com' },
  { position: 4, slug: 'clockify', title: 'Clockify', website: 'https://clockify.me' },
  { position: 5, slug: 'kenjo', title: 'Kenjo', website: 'https://kenjo.io' },
  { position: 6, slug: 'hubstaff', title: 'Hubstaff', website: 'https://hubstaff.com' },
  { position: 7, slug: 'bizneo', title: 'Bizneo', website: 'https://bizneo.com' },
  { position: 8, slug: 'jorn-ada', title: 'JornAda', website: 'https://jorn-ada.com' },
  { position: 9, slug: 'ficha-work', title: 'Ficha.Work', website: 'https://ficha.work' },
  { position: 10, slug: 'skello', title: 'Skello', website: 'https://skello.es' },
];

async function ensureAppsExist(existingSlugs: Set<string>) {
  const missing = RANKING_APPS.filter(a => !existingSlugs.has(a.slug));
  if (missing.length === 0) return;

  console.log('Creating draft apps:', missing.map(m => m.slug));

  for (const app of missing) {
    const { error } = await supabase.from('companies').insert({
      slug: app.slug,
      title: app.title,
      url: app.website,
      description: 'En revisión',
      type: 'draft',
      rank: 100 + app.position,
      rating: 4,
      img_url: '/placeholder.svg',
      logo_url: '/placeholder.svg',
      pricing_starting_price: 0,
      pricing_billing_period: 'mensual',
      pricing_currency: 'EUR',
      verified: false,
      is_top_rated: false,
    });
    if (error) {
      console.warn(`Could not create ${app.slug}:`, error.message);
    }
  }
}

export function useRankingApps() {
  return useQuery({
    queryKey: ['ranking-apps'],
    queryFn: async () => {
      const slugs = RANKING_APPS.map(a => a.slug);
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .in('slug', slugs);

      if (error) throw error;

      const existingSlugs = new Set((data || []).map(d => d.slug));
      
      // Create missing apps
      await ensureAppsExist(existingSlugs);

      // Re-fetch if we created any
      let finalData = data || [];
      if (existingSlugs.size < slugs.length) {
        const { data: refetched } = await supabase
          .from('companies')
          .select('*')
          .in('slug', slugs);
        finalData = refetched || finalData;
      }

      const dataMap = new Map(finalData.map(d => [d.slug, d]));

      const ranked: RankedApp[] = RANKING_APPS.map(app => ({
        position: app.position,
        slug: app.slug,
        title: app.title,
        website: app.website,
        featured: app.featured,
        dbData: dataMap.get(app.slug) || null,
        isDraft: dataMap.get(app.slug)?.type === 'draft' || !dataMap.has(app.slug),
      }));

      return ranked;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export type { RankedApp };
