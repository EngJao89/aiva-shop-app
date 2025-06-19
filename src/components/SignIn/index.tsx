import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";

export function SignIn() {
  return(
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-zinc-100 hover:text-blue-500 p-3">
            <User className="w-8 h-8" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login User</DialogTitle>
            <DialogDescription>
              Login with your account and buy as much as you want.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="Type your name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Password</Label>
              <Input id="username-1" type="password" name="password" placeholder="Type your password" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Enter</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}