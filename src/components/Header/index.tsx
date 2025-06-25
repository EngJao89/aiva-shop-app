'use client'

import dynamic from 'next/dynamic';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {  
  Package, 
  Heart, 
  User, 
  Store
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import { Button } from '../ui/button';
import { SignIn } from '../SignIn';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Badge } from '../ui/badge';

const SignUpSheet = dynamic(() => import('../SignUpSheet'), { 
  ssr: false, 
  loading: () => ( 
    <Button variant="ghost" className="w-10 h-10 text-blue-500 hover:text-blue-800 p-3">
      <User className="w-8 h-8 text-blue-500 hover:text-blue-800" />
    </Button>
  ),
});

export function Header() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full fixed flex justify-between items-center top-0 left-0 glass-nav z-50 p-4">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/')} 
        className="text-blue-500 hover:text-blue-800 p-3"
      >
        <Store className="w-8 h-8"/>
      </Button>
      <NavigationMenu className="max-w-7xl mx-auto">
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:text-blue-800">
                <Package className="w-4 h-4 text-blue-500 hover:text-blue-800" />
                Produtos
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/favorites" className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:text-blue-800 relative">
                <Heart className="w-4 h-4 text-blue-500 hover:text-blue-800" />
                Favoritos
                {mounted && favorites.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {favorites.length}
                  </Badge>
                )}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <SignIn />

      <SignUpSheet />
    </div>
  );
}
