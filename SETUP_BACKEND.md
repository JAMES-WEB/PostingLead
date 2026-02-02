# Setting up Backend Storage (Vercel Postgres)

To persist data (posts and leads) on your live website, you need a database.
We recommend **Vercel Postgres** (it's free and integrated).

## Step 1: Create a Database on Vercel
**Note:** You must deploy your project first before you can add storage.

1. **Deploy first**: Follow the instructions in `DEPLOY.md` to deploy your app to Vercel.
2. Once deployed, go to your **Project Dashboard** on Vercel (e.g., `https://vercel.com/your-name/posting-lead-website`).
3. Click the **Storage** tab at the top of the page.
4. Click **Create Database** -> Select **Postgres**.
5. Accept defaults and click **Create**.
6. Once created, go to the **.env.local** tab in the database page, click **Show Secret**, and copy the variables.

## Step 2: Configure Prisma for Postgres
1. Open `prisma/schema.prisma` in your code.
2. Change the datasource provider from `"sqlite"` to `"postgresql"`.
3. Change the url env var from `"file:./dev.db"` to `env("POSTGRES_PRISMA_URL")` (or `DATABASE_URL` depending on what Vercel gave you).

Example `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // Changed from sqlite
  url      = env("POSTGRES_PRISMA_URL") // Uses Vercel's env var
  directUrl = env("POSTGRES_URL_NON_POOLING") // Optional, for direct connection
}

model Post {
  // ... same models
}
```

## Step 3: Deploy the Database Schema
In your local terminal (ensure you have the Vercel env vars or just do this part in Vercel's build command):

**Easier Way (Vercel Build):**
Vercel automatically runs `prisma generate` during build.
To push the schema to the DB, you can add a "Build Command" in Vercel Settings or run this locally if you have the env vars:

```bash
npx prisma db push
```

**Note:** If you cannot run this locally due to network issues, you can add `npx prisma db push` to your "Build Command" in Vercel Project Settings > General > Build & Development Settings > Build Command.
Change it from `next build` to:
`npx prisma db push && next build`

## Step 4: Verify
Redeploy your app. It should now use the Postgres database instead of the local file.
