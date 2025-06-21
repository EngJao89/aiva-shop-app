'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { User } from "lucide-react";
import { toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import { FormField } from "../ui/form";


const loginSchema = z.object({
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export function SignIn() {
  const router = useRouter();
  const { setUserToken } = useAuth();

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, formState: { errors } } = methods;

      useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('authToken');
      if (token) {
        router.replace('/');
      }
    }
  }, [router]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      if (!data.email || !data.password) {
        toast.warning('Por favor, forneça o nome de usuário e a senha', {theme: "light"});
        throw new Error('Por favor, forneça o nome de usuário e a senha');
      }

      const response = await api.post('api/v1/auth/login', data, {headers: {'Content-Type': 'application/json', },});

      if (response.data.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken); 
        setUserToken(response.data.accessToken); 
        toast.success(`Usuário Logado: ${data.email}, Seja Bem vindo!`, {theme: "light"})
        router.push('/');
      } else {
        toast.error('Token não encontrado na resposta', {theme: "light"})
        throw new Error('Token não encontrado na resposta');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = 'Login falhou. Por favor, verifique suas credenciais e tente novamente.';
        toast.error(axiosError, {theme: "light"});
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.', {theme: "light"});
      }
    }
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-zinc-100 hover:text-blue-500 p-3">
          <User className="w-8 h-8" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Login User</DialogTitle>
              <DialogDescription>
                Login with your account and buy as much as you want.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField 
                  name="email"
                  control={methods.control} 
                  render={({ field }) => (
                    <>
                      <Label>Email</Label>
                      <Input 
                        placeholder="Seu Usuário" 
                        {...field} 
                        value={field.value || ''} 
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField 
                  name="password" 
                  control={methods.control}
                  render={({ field }) => (
                    <>
                      <Label>Password</Label>
                      <Input 
                        type="password" 
                        {...field} 
                        value={field.value || ''} 
                        placeholder="Sua Senha" 
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Enter</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}