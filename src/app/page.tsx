'use client';

import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Product } from "@/@types/types";

import api from "@/lib/axios";
import { apiRoutes } from "@/services/apiRoutes";
import { Category } from "@/components/Category";
import { ProductCard } from "@/components/ProductCard"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div>
      <Category />
      <div className="grid grid-cols-2 gap-6 mt-14 ml-16 mr-16">
        {products.map((product) => (
          <ProductCard key={product.id} products={product}/>
        ))}
      </div>
    </div>
  )
}
