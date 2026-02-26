
interface BlogArticleRendererProps {
  contentHtml: string;
}

export default function BlogArticleRenderer({ contentHtml }: BlogArticleRendererProps) {
  return (
    <div
      className="blog-article-content"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
