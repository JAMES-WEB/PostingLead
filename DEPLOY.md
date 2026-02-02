# Deployment Instructions

## 1. Prerequisites (Crucial Step)
**You must have Git installed to upload your code.**

1.  **Check if Git is installed**:
    -   Open a terminal and type `git --version`.
    -   If you see an error like "term is not recognized", you need to install it.
2.  **Download Git**:
    -   Go to [git-scm.com/downloads](https://git-scm.com/downloads).
    -   Download "Windows" version.
    -   Run the installer and click "Next" through all options.
    -   **Important**: After installing, **restart your computer** or at least restart Trae/VS Code for it to work.

- **GitHub Account**: You need a GitHub account.
- **Vercel Account**: You need a Vercel account linked to GitHub.

## 2. Initialize Git Repository
Once Git is installed and working:

1.  Open your terminal in this folder.
2.  Run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit"
```

## 3. Push to GitHub
1.  Go to [github.com/new](https://github.com/new).
2.  Create a new repository name (e.g., `bernamabiz-clone`).
3.  **Do not** check "Initialize with README".
4.  Copy the code block under **"…or push an existing repository from the command line"**.
5.  Paste it into your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/bernamabiz-clone.git
git branch -M main
git push -u origin main
```

## 4. Deploy to Vercel (Free Domain)
**Only after pushing to GitHub:**

1.  Go to [vercel.com/new](https://vercel.com/new).
2.  You should see your new repository `bernamabiz-clone` in the list.
3.  Click **Import**.
4.  Click **Deploy**.

## 5. Set up Database (Production)
For your live site to save data permanently, follow the instructions in [SETUP_BACKEND.md](./SETUP_BACKEND.md).
This will guide you to set up a free Vercel Postgres database.

## 6. Accessing Your Site
Once deployed, your site will be live at the URL provided by Vercel.
- **Home:** `/`
- **Posting Space:** `/post`
- **Lead Capture:** (Bottom of home page)

## Troubleshooting
- If fonts fail to load, ensure `layout.tsx` is using standard fonts or `next/font` is configured correctly.
- If data is not saving on Vercel, check if you set up Vercel Postgres correctly (Step 5).
