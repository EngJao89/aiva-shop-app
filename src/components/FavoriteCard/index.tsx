import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { useFavorites } from "@/contexts/FavoritesContext";
import { Product } from "@/@types/types";
import { formatPrice } from "@/utils/formatter";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


interface CardProps {
  products: Product;
}

export function FavoriteCard({ products }: CardProps) {
  const { removeFromFavorites } = useFavorites();

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(products.id);
    toast.success(`${products.title} removido dos favoritos!`, { theme: "light" });
  };

  return (
    <Card className="bg-zinc-600">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-zinc-100 flex-1">{products.title}</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleRemoveFromFavorites}
          className="p-2 hover:bg-zinc-500"
        >
          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
        </Button>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {products.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={image}
                    alt={`${products.title} - Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
      <CardFooter className="justify-between items-center">
        <Badge>
          {products.category.name}
        </Badge>

        <h1 className="text-zinc-200 text-bold">
          {formatPrice(products.price)}
        </h1>
      </CardFooter>
    </Card>
  );
}
