import Link from "next/link";
import { Home, Package, Heart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../ui/navigation-menu";

export function Header() {
  return (
    <div className="w-full fixed top-0 left-0 glass-nav z-50">
      <NavigationMenu className="max-w-7xl mx-auto p-4">
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="flex items-center gap-2 px-4 py-2 text-zinc-800 hover:text-blue-500">
                <Home className="w-4 h-4 text-zinc-800 hover:text-blue-500" />
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/products" className="flex items-center gap-2 px-4 py-2 text-zinc-800 hover:text-blue-500">
                <Package className="w-4 h-4 text-zinc-800 hover:text-blue-500" />
                Produtos
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/docs" className="flex items-center gap-2 px-4 py-2 text-zinc-800 hover:text-blue-500">
                <Heart className="w-4 h-4 text-zinc-800 hover:text-blue-500" />
                Favoritos
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}