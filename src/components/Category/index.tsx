import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

import api from "@/lib/axios";
import { CategoryProducts } from "@/@types/types";
import { apiRoutes } from "@/services/apiRoutes";
import { SectionCatergory } from "../SectionCategory";

interface CategoryProps {
  selectedCategory?: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

export function Category({ selectedCategory, onCategorySelect }: CategoryProps) {
  const [categories, setCategories] = useState<CategoryProducts[]>([]);

  const fetchCategory = useCallback(async () => {
    try {
      const response = await api.get(apiRoutes.category);
      setCategories(response.data);
    } catch(error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(`Erro ao carregar categorias: ${axiosError.message}`, { theme: "light" });
      } else if (error instanceof Error) {
        toast.error(`Um erro aconteceu: ${error.message}`, { theme: "light" });
      } else {
        toast.error('Um erro inesperado aconteceu', { theme: "light" });
      }
    }
  }, []);

  useEffect(() => {
    fetchCategory()
  }, [fetchCategory]);

  const handleCategoryClick = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      // Se clicar na mesma categoria, remove o filtro
      onCategorySelect(null);
    } else {
      // Seleciona a nova categoria
      onCategorySelect(categoryId);
    }
  };

  return (
    <div className="m-4">
      <div className="m-10">
        <h1 className="text-zinc-700 font-bold text-2xl">Categorias</h1>
      </div>

      <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-8">
        {categories.map((category) => (
          <SectionCatergory 
            key={category.id} 
            categories={category}
            isSelected={selectedCategory === category.id}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </div>
    </div>
  );
}