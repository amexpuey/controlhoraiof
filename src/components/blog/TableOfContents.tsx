
import { useState, useEffect, useMemo } from "react";
import { List, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentHtml: string;
}

export default function TableOfContents({ contentHtml }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const items = useMemo<TocItem[]>(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, "text/html");
    const headings = doc.querySelectorAll("h2, h3");
    return Array.from(headings)
      .filter((h) => h.id)
      .map((h) => ({
        id: h.id,
        text: h.textContent || "",
        level: h.tagName === "H2" ? 2 : 3,
      }));
  }, [contentHtml]);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const list = (
    <nav className="space-y-1">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`block text-sm py-1 transition-colors ${
            item.level === 3 ? "pl-4" : ""
          } ${
            activeId === item.id
              ? "text-[var(--green)] font-semibold border-l-2 border-[var(--green)] pl-3"
              : "text-[var(--text-secondary)] hover:text-[var(--text)] border-l-2 border-transparent pl-3"
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );

  if (isMobile) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6 border border-[var(--border)] rounded-lg bg-[var(--surface-alt)]">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-sm font-semibold">
          <span className="flex items-center gap-2">
            <List className="w-4 h-4" /> Tabla de contenidos
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">{list}</CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="sticky top-24">
      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-2">
        <List className="w-4 h-4" /> Contenidos
      </h4>
      {list}
    </div>
  );
}
