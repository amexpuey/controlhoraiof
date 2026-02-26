
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, published_at, author, category")
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(20);

  const baseUrl = "https://fichajeempresas.es";
  const items = (posts || []).map((p: any) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/blog/${p.slug}</link>
      <description><![CDATA[${p.excerpt}]]></description>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
      <category>${p.category}</category>
      <guid isPermaLink="true">${baseUrl}/blog/${p.slug}</guid>
    </item>`).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog FichajesEmpresas.es</title>
    <link>${baseUrl}/blog</link>
    <description>Recursos, guías y comparativas sobre control horario y registro de jornada laboral en España.</description>
    <language>es</language>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { ...corsHeaders, "Content-Type": "application/rss+xml; charset=utf-8" },
  });
});
