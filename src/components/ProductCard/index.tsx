import { Product } from "@/@types/types";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface CardProps {
  products: Product
}

export function ProductCard ({ products }: CardProps) {
  return (
    <Card className="bg-zinc-600">
      <CardHeader>
        <CardTitle className="text-zinc-100">{products.title}</CardTitle>

      </CardHeader>
    </Card>
  )
}