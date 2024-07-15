This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Creation Steps

First, create the next.js project:

```bash
npx create-next-app@latest
```

Then, install the following dependencies:

```bash
# Install trpc
npm install @trpc/server@next @trpc/client@next
# Install trcp/react-query and tanstack/react-query
npm install @trpc/react-query@next @tanstack/react-query@latest   
```

Create a `server` folder in the root of the project and add the following files:

```bash
server/
    trpc.ts
```

