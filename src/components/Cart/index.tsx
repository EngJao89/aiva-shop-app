import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import { Button } from "../ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "../ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/formatter";
import { Badge } from "../ui/badge";

export function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();

  const handleRemoveFromCart = (productId: number, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removido do carrinho!`, { theme: "light" });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Carrinho limpo com sucesso!", { theme: "light" });
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
    return `https://picsum.photos/100/100?random=${Math.random()}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-blue-500 hover:text-blue-800 p-3 relative">
          <ShoppingCart className="w-8 h-8" />
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Carrinho de compras</SheetTitle>
          <SheetDescription>
            Aqui você pode gerenciar os itens do seu carrinho de compras.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Seu carrinho está vazio</p>
                <p className="text-gray-400 text-sm">Adicione produtos para começar</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={getValidImageUrl(item.product.images[0])}
                        alt={item.product.title}
                        fill
                        className="object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://picsum.photos/100/100?random=${Math.random()}`;
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.title}</h3>
                      <p className="text-gray-500 text-sm">{formatPrice(item.product.price)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromCart(item.product.id, item.product.title)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total ({getTotalItems()} itens):</span>
                  <span className="font-bold text-lg">{formatPrice(getTotalPrice())}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleClearCart}
                    className="flex-1"
                  >
                    Limpar Carrinho
                  </Button>
                  <Button className="flex-1">
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
