'use client';

import { FavoriteCard } from "@/components/FavoriteCard";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-8">Meus Favoritos</h1>
        <div className="text-center py-12">
          <p className="text-zinc-400 text-lg">
            Você ainda não tem produtos favoritos.
          </p>
          <p className="text-zinc-500 mt-2">
            Adicione produtos aos favoritos para vê-los aqui!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-zinc-100 mb-8">
        Meus Favoritos ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <FavoriteCard key={product.id} products={product} />
        ))}
      </div>
    </div>
  );
}