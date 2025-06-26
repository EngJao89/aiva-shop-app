import { ShoppingCart } from "lucide-react";

import { Button } from "../ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "../ui/sheet";

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-blue-500 hover:text-blue-800 p-3">
          <ShoppingCart className="w-8 h-8" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho de compras</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
