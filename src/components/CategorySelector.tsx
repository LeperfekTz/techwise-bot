
import React from "react";
import { Button } from "@/components/ui/button";
import { HardDrive, Monitor } from "lucide-react";

type Category = "hardware" | "software";

interface CategorySelectorProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        variant={selectedCategory === "hardware" ? "default" : "outline"}
        className="flex-1 gap-2 py-6"
        onClick={() => onSelectCategory("hardware")}
      >
        <HardDrive size={20} />
        <span>Problema de Hardware</span>
      </Button>
      
      <Button
        variant={selectedCategory === "software" ? "default" : "outline"}
        className="flex-1 gap-2 py-6"
        onClick={() => onSelectCategory("software")}
      >
        <Monitor size={20} />
        <span>Problema de Software</span>
      </Button>
    </div>
  );
};

export default CategorySelector;
