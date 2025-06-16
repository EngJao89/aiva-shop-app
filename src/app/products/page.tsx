'use client'

import { useCallback, useEffect, useState } from "react"

import { Product } from "@/@types/types";
import api from "@/lib/axios";
import { apiRoutes } from "@/services/apiRoutes";
import { ProductCard } from "@/components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try{
      const response = await api.get<Product[]>(apiRoutes.product)
      setProducts(response.data)
    } catch {}
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="grid grid-cols-2 gap-6 mt-14 ml-16 mr-16">
      {products.map((product) => (
        <ProductCard key={product.id} products={product}/>
      ))}
    </div>
  )
}