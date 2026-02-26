
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  // Legacy
  { value: "Normativa", label: "Normativa (legacy)" },
  { value: "Registro Horario", label: "Registro Horario" },
  { value: "Trabajo Remoto", label: "Trabajo Remoto" },
];

export default function BlogCategoryTabs({ activeCategory, setActiveCategory, children }: BlogCategoryTabsProps) {
  const isMobile = useIsMobile();

  // Filter to only show categories that have a reasonable chance of having posts
  const visibleCategories = categories.filter(c => 
    ["all", "control-horario", "normativa-legal", "comparativas", "sectores", "productividad", "guias", "alternativas",
     "Normativa", "Registro Horario", "Productividad", "Trabajo Remoto"].includes(c.value)
  );

  return (
    <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
      <TabsList className={`${isMobile ? 'flex flex-wrap overflow-x-auto gap-1 bg-transparent p-0 h-auto' : 'flex flex-wrap gap-1'} mb-8`}>
        {visibleCategories.map((cat) => (
          <TabsTrigger
            key={cat.value}
            value={cat.value}
            className={isMobile ? "flex-shrink-0 bg-white shadow-sm text-xs" : "text-sm"}
          >
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {visibleCategories.map((cat) => (
        <TabsContent key={cat.value} value={cat.value} className="space-y-8">
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
