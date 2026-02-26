
import { useIsMobile } from "@/hooks/use-mobile";

interface BlogCategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  children: React.ReactNode;
}

const categories = [
  { value: "all", label: "Todos" },
  { value: "control-horario", label: "Control Horario" },
  { value: "normativa-legal", label: "Normativa" },
  { value: "comparativas", label: "Comparativas" },
  { value: "sectores", label: "Sectores" },
  { value: "gestion-ausencias", label: "Ausencias" },
  { value: "productividad", label: "Productividad" },
  { value: "guias", label: "Guías" },
  { value: "alternativas", label: "Alternativas" },
];

export default function BlogCategoryTabs({ activeCategory, setActiveCategory, children }: BlogCategoryTabsProps) {
  const isMobile = useIsMobile();

  return (
    <div className="mb-8">
      <div className={`flex ${isMobile ? 'flex-wrap' : 'flex-wrap'} gap-2 mb-8`}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border"
              style={{
                background: isActive ? "var(--green-bg)" : "var(--white)",
                borderColor: isActive ? "var(--green)" : "var(--border)",
                color: isActive ? "var(--green-dark)" : "var(--text-secondary)",
              }}
            >
              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--green)" }}
                />
              )}
              {cat.label}
            </button>
          );
        })}
      </div>

      {children}
    </div>
  );
}
