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
We have added a `vercel.json` file to automatically handle the setup.

**Important:**
1. Go to your Vercel Project Settings > **General**.
2. Scroll to **Build & Development Settings**.
3. **Ensure "Build Command" and "Install Command" are NOT overridden.** (Turn off the "Override" toggle if it is on).
4. Redeploy your app.

This will automatically run `npm install && npx prisma generate` during installation, and `next build` for the build.

**One-time Schema Push:**
If the database tables are not created yet, you might need to run the schema push manually locally or via a one-off command, but usually `prisma generate` is enough for the client.
To actually create tables in Vercel Postgres:
1. Connect your local terminal to Vercel: `npx vercel link`
2. Push schema: `npx prisma db push`
(Or use the Vercel Storage tab "Browser" to check if tables exist).

## Step 4: Verify
Redeploy your app. It should now use the Postgres database instead of the local file.
