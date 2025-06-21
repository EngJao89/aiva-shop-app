'use client';

import { UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SignUpSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="submit" variant="ghost" className="text-blue-500 hover:text-blue-800 p-3">
          <UserRoundPlus className="w-8 h-8" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Register User</SheetTitle>
          <SheetDescription className="mt-5">
            Fill in your details and enjoy your shopping!
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 mt-4 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" placeholder="Type your name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Email</Label>
            <Input id="sheet-demo-username" placeholder="Type your email" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Password</Label>
            <Input id="sheet-demo-username" type="password"  placeholder="Type your password" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Image</Label>
            <Input id="sheet-demo-name" placeholder="Type your image url" />
          </div>
        </div>

        <SheetFooter>
          <Button type="submit">Register</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}