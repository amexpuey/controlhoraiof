import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import type { SiteArticle } from "@/pages/admin/Articles";

interface Props {
  articles: SiteArticle[];
  isLoading: boolean;
  onEdit: (article: SiteArticle) => void;
  onToggleStatus: (article: SiteArticle) => void;
}

export default function ArticlesTable({ articles, isLoading, onEdit, onToggleStatus }: Props) {
  if (isLoading) return <p className="text-muted-foreground">Cargando artículos...</p>;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha pub.</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="font-medium max-w-[300px] truncate">{a.title}</TableCell>
              <TableCell><Badge variant="outline">{a.category}</Badge></TableCell>
              <TableCell>
                <Badge variant={a.status === "published" ? "default" : "secondary"}>
                  {a.status === "published" ? "Publicado" : "Borrador"}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(a.published_at).toLocaleDateString("es-ES")}
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Button size="sm" variant="ghost" onClick={() => onEdit(a)} title="Editar">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onToggleStatus(a)} title={a.status === "published" ? "Despublicar" : "Publicar"}>
                  {a.status === "published" ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost" asChild title="Ver en blog">
                  <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {articles.length === 0 && (
            <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No se encontraron artículos</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
