import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSolutions(filters?: {
  category?: string;
  search?: string;
  isFree?: boolean;
  isTopRated?: boolean;
  sortBy?: 'rank' | 'title' | 'rating';
  page?: number;
  perPage?: number;
}) {
  const page = filters?.page || 1;
  const perPage = filters?.perPage || 24;

  return useQuery({
    queryKey: ['solutions', filters],
    queryFn: async () => {
      let query = supabase
        .from('companies')
        .select('*', { count: 'exact' })
        .not('rank', 'is', null);

      if (filters?.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }
      if (filters?.isFree) {
        query = query.eq('is_free', true);
      }
      if (filters?.isTopRated) {
        query = query.eq('is_top_rated', true);
      }

      // Sort: promoted first, then by chosen sort
      switch (filters?.sortBy) {
        case 'title':
          query = query.order('is_promoted', { ascending: false }).order('title', { ascending: true });
          break;
        case 'rating':
          query = query.order('is_promoted', { ascending: false }).order('rating', { ascending: false, nullsFirst: false });
          break;
        default:
          query = query.order('is_promoted', { ascending: false }).order('rank', { ascending: true });
      }

      const from = (page - 1) * perPage;
      query = query.range(from, from + perPage - 1);

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        solutions: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / perPage),
        currentPage: page,
      };
    },
  });
}

export function useSolution(slug: string) {
  return useQuery({
    queryKey: ['solution', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error(`Solution not found: ${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}

export function useRelatedSolutions(currentSlug: string, limit = 6) {
  return useQuery({
    queryKey: ['related-solutions', currentSlug],
    queryFn: async () => {
      // Get current solution's categories
      const { data: current } = await supabase
        .from('companies')
        .select('id')
        .eq('slug', currentSlug)
        .single();

      if (!current) return [];

      const { data: catLinks } = await supabase
        .from('solution_categories')
        .select('category_id')
        .eq('solution_id', current.id);

      if (!catLinks?.length) {
        // Fallback: return top-ranked solutions
        const { data } = await supabase
          .from('companies')
          .select('*')
          .not('slug', 'eq', currentSlug)
          .not('rank', 'is', null)
          .order('rank', { ascending: true })
          .limit(limit);
        return data || [];
      }

      const categoryIds = catLinks.map(c => c.category_id);
      const { data: relatedLinks } = await supabase
        .from('solution_categories')
        .select('solution_id')
        .in('category_id', categoryIds)
        .neq('solution_id', current.id);

      if (!relatedLinks?.length) return [];

      const uniqueIds = [...new Set(relatedLinks.map(r => r.solution_id))].slice(0, limit);
      const { data } = await supabase
        .from('companies')
        .select('*')
        .in('id', uniqueIds);

      return data || [];
    },
    enabled: !!currentSlug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data || [];
    },
  });
}
