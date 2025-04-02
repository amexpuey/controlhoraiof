
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryLabels {
  [key: string]: string;
}

interface BlogCategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  children: React.ReactNode;
}

export default function BlogCategoryTabs({ 
  activeCategory, 
  setActiveCategory, 
  children 
}: BlogCategoryTabsProps) {
  const isMobile = useIsMobile();
  
  const categoryLabels: CategoryLabels = {
    "all": "Todos",
    "Normativa": "Normativa",
    "Registro Horario": "Registro Horario",
    "Productividad": "Productividad",
    "Trabajo Remoto": "Trabajo Remoto"
  };
  
  const availableCategories = [
    "all", 
    "Normativa", 
    "Registro Horario", 
    "Productividad", 
    "Trabajo Remoto"
  ];

  return (
    <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
      <TabsList className={`${isMobile ? 'flex flex-wrap overflow-x-auto gap-1 bg-transparent p-0 h-auto' : 'grid grid-cols-5'} mb-8`}>
        {availableCategories.map((category) => (
          <TabsTrigger 
            key={category}
            value={category}
            className={isMobile ? 
              `flex-1 min-w-[${category === 'all' ? '90' : category === 'Normativa' ? '110' : category === 'Productividad' ? '130' : category === 'Trabajo Remoto' ? '140' : '120'}px] bg-white shadow-sm` 
              : ""}
          >
            {categoryLabels[category]}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {availableCategories.map((category) => (
        <TabsContent key={category} value={category} className="space-y-8">
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
