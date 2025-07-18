'use client';

import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";

import { Product } from "@/@types/types";

import api from "@/lib/axios";
import { apiRoutes } from "@/services/apiRoutes";
import { Category } from "@/components/Category";
import { ProductCard } from "@/components/ProductCard"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await api.get<Product[]>(apiRoutes.product)
      setProducts(response.data)
    } catch (error: unknown) { 
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(`Erro ao carregar produtos: ${axiosError.message}`, { theme: "light" });
      } else if (error instanceof Error) {
        toast.error(`Um erro aconteceu: ${error.message}`, { theme: "light" });
      } else {
        toast.error('Um erro inesperado aconteceu', { theme: "light" });
      }
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }
    return products.filter(product => product.category.id === selectedCategory);
  }, [products, selectedCategory]);

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <Category 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <div className="px-16 mb-6">
        {selectedCategory && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-zinc-700">
              Produtos da categoria selecionada
            </h2>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Limpar filtro
            </button>
          </div>
        )}
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg">
              {selectedCategory 
                ? "Nenhum produto encontrado nesta categoria." 
                : "Nenhum produto disponível."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} products={product}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
