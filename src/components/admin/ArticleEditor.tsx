import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SiteArticle } from "@/pages/admin/Articles";

interface Props {
  article: SiteArticle;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ArticleEditor({ article, open, onClose, onSaved }: Props) {
  const [form, setForm] = useState({ ...article });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const set = (field: string, value: any) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const { id, created_at, ...updateData } = form;
      const { error } = await (supabase as any)
        .from("site_articles")
        .update({ ...updateData, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      toast({ title: "Artículo guardado" });
      onSaved();
    } catch (e: any) {
      toast({ title: "Error al guardar", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar artículo</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="content">Contenido</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="media">Media & CTA</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug || ""} onChange={(e) => set("slug", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Input value={form.category || ""} onChange={(e) => set("category", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Autor</Label>
                <Input value={form.author || ""} onChange={(e) => set("author", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select value={form.status} onValueChange={(v) => set("status", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Publicado</SelectItem>
                    <SelectItem value="draft">Borrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fecha publicación</Label>
                <Input type="datetime-local" value={form.published_at?.slice(0, 16) || ""} onChange={(e) => set("published_at", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt || ""} onChange={(e) => set("excerpt", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Tags (separados por coma)</Label>
              <Input value={(form.tags || []).join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((t: string) => t.trim()).filter(Boolean))} />
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Contenido HTML</Label>
              <Textarea value={form.content_html || ""} onChange={(e) => set("content_html", e.target.value)} rows={20} className="font-mono text-xs" />
            </div>
            <div className="space-y-2">
              <Label>Contenido Markdown</Label>
              <Textarea value={form.content_markdown || ""} onChange={(e) => set("content_markdown", e.target.value)} rows={10} className="font-mono text-xs" />
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meta título</Label>
                <Input value={form.meta_title || ""} onChange={(e) => set("meta_title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Focus keyword</Label>
                <Input value={form.focus_keyword || ""} onChange={(e) => set("focus_keyword", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Meta descripción</Label>
              <Textarea value={form.meta_description || ""} onChange={(e) => set("meta_description", e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>URL canónica</Label>
              <Input value={form.canonical_url || ""} onChange={(e) => set("canonical_url", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Keywords secundarias (separadas por coma)</Label>
              <Input value={(form.secondary_keywords || []).join(", ")} onChange={(e) => set("secondary_keywords", e.target.value.split(",").map((t: string) => t.trim()).filter(Boolean))} />
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Imagen destacada (URL)</Label>
                <Input value={form.featured_image || ""} onChange={(e) => set("featured_image", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Alt imagen destacada</Label>
                <Input value={form.featured_image_alt || ""} onChange={(e) => set("featured_image_alt", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>OG Image URL</Label>
                <Input value={form.og_image_url || ""} onChange={(e) => set("og_image_url", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Avatar autor (URL)</Label>
                <Input value={form.author_avatar_url || ""} onChange={(e) => set("author_avatar_url", e.target.value)} />
              </div>
            </div>
            {form.featured_image && (
              <img src={form.featured_image} alt="Preview" className="h-32 object-cover rounded-lg border" />
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CTA texto</Label>
                <Input value={form.primary_cta_text || ""} onChange={(e) => set("primary_cta_text", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>CTA URL</Label>
                <Input value={form.primary_cta_url || ""} onChange={(e) => set("primary_cta_url", e.target.value)} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
