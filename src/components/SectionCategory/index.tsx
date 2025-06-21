'use client';

import { CategoryProducts } from "@/@types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CategoryProps {
  categories: CategoryProducts
}

export function SectionCatergory({categories}: CategoryProps) {
  return(
    <div className="flex flex-col items-center min-w-[80px]">
      <Avatar className="mb-3">
        <AvatarImage src={categories.image}/>
        <AvatarFallback>{categories.slug}</AvatarFallback>
      </Avatar>

      <h1 className="text-zinc-700 font-bold text-xs text-center">{categories.name}</h1>
    </div>
  )
}
