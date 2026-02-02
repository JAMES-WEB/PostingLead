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
We have updated `package.json` to automatically run `prisma generate` during the build.

To create the database tables (required for the app to work), you need to push the schema **once**.

**Recommended Way:**
1. Go to your Vercel Project Settings > **General**.
2. Scroll to **Build & Development Settings**.
3. In **Build Command**, toggle "Override" and enter:
   ```bash
   npx prisma db push && next build
   ```
4. Redeploy your app.
5. (Optional) Once deployed successfully, you can turn off the Override (the app will continue to work).

## Step 4: Verify
Redeploy your app. It should now use the Postgres database instead of the local file.
