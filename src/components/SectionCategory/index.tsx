'use client';

import { CategoryProducts } from "@/@types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CategoryProps {
  categories: CategoryProducts;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SectionCatergory({ categories, isSelected = false, onClick }: CategoryProps) {
  return(
    <div 
      className={`flex flex-col items-center min-w-[80px] cursor-pointer transition-all duration-200 ${
        isSelected ? 'scale-110' : 'hover:scale-105'
      }`}
      onClick={onClick}
    >
      <Avatar className={`mb-3 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
        <AvatarImage src={categories.image}/>
        <AvatarFallback>{categories.slug}</AvatarFallback>
      </Avatar>

      <h1 className={`text-xs text-center font-bold ${
        isSelected ? 'text-blue-600' : 'text-zinc-700'
      }`}>
        {categories.name}
      </h1>
    </div>
  )
}
