'use client'

import dynamic from 'next/dynamic';
import Link from "next/link";

import { Home, Package, Heart, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import { Button } from '../ui/button';

const SignUpSheet = dynamic(() => import('../SignUpSheet'), { 
  ssr: false, 
  loading: () => ( 
    <Button variant="ghost" className="text-zinc-100 hover:text-blue-500">
      <User className="w-8 h-8" />
    </Button>
  ),
});

export function Header() {
  return (
    <div className="w-full fixed flex justify-between items-center top-0 left-0 glass-nav z-50 p-4">
      <NavigationMenu className="max-w-7xl mx-auto">
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="flex items-center gap-2 px-4 py-2 text-zinc-100 hover:text-blue-500">
                <Home className="w-4 h-4 text-zinc-100 hover:text-blue-500" />
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/products" className="flex items-center gap-2 px-4 py-2 text-zinc-100 hover:text-blue-500">
                <Package className="w-4 h-4 text-zinc-100 hover:text-blue-500" />
                Produtos
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/docs" className="flex items-center gap-2 px-4 py-2 text-zinc-100 hover:text-blue-500">
                <Heart className="w-4 h-4 text-zinc-100 hover:text-blue-500" />
                Favoritos
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <SignUpSheet />
    </div>
  );
}
