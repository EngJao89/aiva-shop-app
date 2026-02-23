# Aiva Shop App

Aplicação que simula um marketplace de roupas. A Home exibe produtos e categorias; Favoritos e Carrinho exigem login. Desenvolvida com Next.js, TypeScript e Shadcn UI.

---

## Descrição do projeto

O **Aiva Shop App** é um e-commerce de demonstração com:

- **Home**: listagem de produtos com filtro por categoria (API externa).
- **Favoritos**: página de produtos favoritos (requer autenticação).
- **Carrinho**: drawer no header com itens, quantidades e totais (requer autenticação).
- **Autenticação**: login e cadastro simulados; token armazenado em `localStorage`. Sem backend real de auth.

Os dados de produtos e categorias vêm da [Fake Store API](https://api.escuelajs.co/). Favoritos e carrinho são mantidos no cliente (Context + `localStorage` para o carrinho).

---

## Como rodar o projeto

### Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm**, **yarn**, **pnpm** ou **bun**

### Instalação

```bash
# Clone o repositório (se ainda não tiver)
git clone <url-do-repositorio>
cd aiva-shop-app

# Instale as dependências
npm install
```

### Variáveis de ambiente (opcional)

O app funciona sem `.env`. Para customizar a URL base (ex.: em deploy):

| Variável                | Descrição                          | Padrão              |
|-------------------------|------------------------------------|---------------------|
| `NEXT_PUBLIC_BASE_URL`  | URL base da aplicação (front-end) | `http://localhost:3000` |

Crie um arquivo `.env.local` na raiz se quiser sobrescrever:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Scripts disponíveis

| Comando        | Descrição                                      |
|----------------|------------------------------------------------|
| `npm run dev`  | Sobe o servidor de desenvolvimento (Turbopack) |
| `npm run build`| Gera o build de produção                       |
| `npm run start`| Sobe o app em modo produção (após `build`)     |
| `npm run lint` | Executa o ESLint                               |
| `npm run commit`| Abre o Commitizen para commits padronizados   |

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). A API de produtos já está configurada para `https://api.escuelajs.co/`.

### Build e produção

```bash
npm run build
npm run start
```

---

## Decisões técnicas e arquiteturais

### Stack

| Área           | Escolha        | Motivo principal                                      |
|----------------|----------------|--------------------------------------------------------|
| Linguagem      | **TypeScript** | Tipagem estática e melhor manutenção                  |
| Framework      | **Next.js 15** | SSR/SSG, App Router, integração com Vercel            |
| UI             | **Shadcn UI**  | Componentes acessíveis, customizáveis e maduros       |
| Roteamento     | **App Router** | File-based routing, layouts e loading do Next.js      |
| HTTP client    | **Axios**      | Instância configurada (baseURL, headers) e interceptors|
| Formulários    | **React Hook Form + Zod** | Validação e performance (menos re-renders)   |
| Toasts         | **React Toastify** | Feedback rápido e simples para o usuário          |
| Ícones         | **Lucide React**  | Leve e consistente com o design system              |
| Qualidade      | **ESLint**     | Padrão de código alinhado ao Next.js                  |
| Commits        | **Commitizen** | Mensagens de commit padronizadas (conventional commits)|
| Testes         | **Testing Library + Jest** | Foco em comportamento e componentes (configurado no projeto) |
| Deploy         | **Vercel**     | CI/CD nativo para Next.js                             |

### Arquitetura da aplicação

- **App Router**: Rotas em `src/app/` — `page.tsx` (Home) e `favorites/page.tsx` (Favoritos). Layout raiz em `layout.tsx` com providers e `Header` global.
- **Contextos (React Context)**:
  - **AuthContext**: token de autenticação (leitura/gravação em `localStorage`), usado para exibir/ocultar Favoritos e Carrinho.
  - **FavoritesContext**: lista de produtos favoritos (apenas em memória).
  - **CartContext**: itens do carrinho com quantidade; persistência em `localStorage` e sincronização ao montar.
- **Serviços**: `src/services/apiRoutes.ts` centraliza os endpoints; `src/lib/axios.ts` define a instância do Axios (baseURL da Fake Store API).
- **Tipos**: `src/@types/types.ts` — `Product` e `CategoryProducts` alinhados à API.
- **Componentes**:
  - **UI**: `src/components/ui/` — Shadcn (Button, Card, Sheet, Dialog, etc.).
  - **Feature**: Header, Category, ProductCard, FavoriteCard, Cart, SignIn, SignUpSheet, etc.
- **Hooks**: `useLocalStorage`, `use-mobile` (breakpoint); uso de `useMemo`/`useCallback` onde faz sentido para performance.
- **Imagens**: Next.js `Image` com `remotePatterns` em `next.config.ts` para os domínios das imagens da API e placeholders.

### Fluxo de dados

- **Produtos e categorias**: fetch na Home via Axios → estado local → filtro por categoria em memória.
- **Auth**: login/cadastro simulados definem um token no AuthContext e no `localStorage`; o Header e as rotas usam esse estado para mostrar/redirecionar.
- **Carrinho**: CartContext atualiza estado e persiste em `localStorage`; leitura inicial no `useEffect` após mount para evitar hidratação incorreta.
- **Favoritos**: FavoritesContext em memória; possível evoluir para persistência (ex.: `localStorage` ou API) sem mudar a interface do contexto.

### Segurança e limites

- Autenticação é **simulada** (sem backend real). Não usar para dados sensíveis.
- Token em `localStorage`; em produção com backend real, considerar httpOnly cookies e refresh tokens.
- API pública (Fake Store) apenas para demonstração; em produção usar API própria com controle de acesso.

---

## Estrutura de pastas (resumo)

```
src/
├── app/                 # App Router (pages, layout, globals.css)
├── components/          # Componentes React (Header, Cart, ProductCard, ui/, etc.)
├── contexts/            # Auth, Favorites, Cart
├── hooks/               # useLocalStorage, use-mobile
├── lib/                 # axios, utils
├── services/            # apiRoutes
├── utils/               # formatter e helpers
└── @types/              # types.ts (Product, CategoryProducts)
```

---

## Deploy

- **URL**: [https://aiva-shop-app.vercel.app/](https://aiva-shop-app.vercel.app/)
- **Plataforma**: Vercel (recomendado para Next.js).

Para deploy na Vercel: conecte o repositório e use os comandos de build padrão (`npm run build` / `next build`). A variável `NEXT_PUBLIC_BASE_URL` pode ser definida no painel da Vercel para a URL de produção.
