import Image from "next/image";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

import { Product } from "@/@types/types";
import { formatPrice } from "@/utils/formatter";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";


interface CardProps {
  products: Product;
}

export function ProductCard({ products }: CardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(products.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(products.id);
      toast.success(`${products.title} removido dos favoritos!`, { theme: "light" });
    } else {
      addToFavorites(products);
      toast.success(`${products.title} adicionado aos favoritos!`, { theme: "light" });
    }
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getValidImageUrl = (url: string) => {
    if (isValidImageUrl(url)) {
      return url;
    }
    return `https://picsum.photos/400/300?random=${Math.random()}`;
  };

  return (
    <Card className="bg-zinc-600">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-zinc-100 flex-1">{products.title}</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleToggleFavorite}
          className="p-2 hover:bg-zinc-500"
        >
          <Heart 
            className={`w-4 h-4 ${favorite ? 'text-red-500 fill-red-500' : 'text-zinc-100'}`} 
          />
        </Button>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {products.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image
                    src={getValidImageUrl(image)}
                    alt={`${products.title} - Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/400/300?random=${Math.random()}`;
                    }}
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
