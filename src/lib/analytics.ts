/**
 * GA4 Custom Events for FichajeEmpresas.es
 * Uses window.gtag (loaded in index.html)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params?: Record<string, unknown>) {
  if (window.gtag) {
    window.gtag('event', event, params);
  }
}

// -- Directory / Solutions --

export function trackSolutionView(slug: string, title: string) {
  track('view_solution', { solution_slug: slug, solution_name: title });
}

export function trackSolutionClick(slug: string, title: string) {
  track('select_solution', { solution_slug: slug, solution_name: title });
}

export function trackExternalLinkClick(slug: string, title: string, url: string) {
  track('click_external_link', { solution_slug: slug, solution_name: title, destination_url: url });
}

// -- Lead Gate --

export function trackLeadCapture(templateSlug: string, templateTitle: string) {
  track('generate_lead', {
    template_slug: templateSlug,
    template_name: templateTitle,
    currency: 'EUR',
    value: 1,
  });
}

// -- Templates / Downloads --

export function trackTemplateDownload(templateSlug: string, templateTitle: string) {
  track('file_download', { template_slug: templateSlug, template_name: templateTitle });
}

// -- Compliance Checker --

export function trackComplianceComplete(score: number, level: string) {
  track('compliance_check_complete', { compliance_score: score, risk_level: level });
}

// -- Votes --

export function trackVote(companyId: string) {
  track('vote_solution', { company_id: companyId });
}

// -- Blog --

export function trackBlogView(slug: string, category: string) {
  track('view_blog_post', { post_slug: slug, post_category: category });
}
