import Image from "next/image";
import { Product } from "@/@types/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/utils/formatter";

interface CardProps {
  products: Product;
}

export function ProductCard({ products }: CardProps) {
  return (
    <Card className="bg-zinc-600">
      <CardHeader>
        <CardTitle className="text-zinc-100">{products.title}</CardTitle>
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
