export type CategoryProducts = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: CategoryProducts;
  images: string[];
  creationAt: string;
  updatedAt: string;
};
