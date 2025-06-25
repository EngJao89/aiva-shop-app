'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/@types/types';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 