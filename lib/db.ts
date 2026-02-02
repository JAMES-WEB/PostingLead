import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl?: string | null;
  createdAt: Date | string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: Date | string;
}

// ==========================================
// Strategy 1: Local JSON File (Development)
// ==========================================
const DB_PATH = path.join(process.cwd(), 'data.json');

const jsonAdapter = {
  init: () => {
    if (!fs.existsSync(DB_PATH)) {
      try {
        fs.writeFileSync(DB_PATH, JSON.stringify({ posts: [], leads: [] }, null, 2));
      } catch (e) {
        // Ignore write error in serverless/readonly env
        console.warn("Could not initialize data.json", e);
      }
    }
  },
  read: () => {
    try {
      if (!fs.existsSync(DB_PATH)) return { posts: [], leads: [] };
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return { posts: [], leads: [] };
    }
  },
  write: (data: any) => {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("Failed to write to data.json (likely readonly fs)", e);
    }
  },
  getPosts: async (): Promise<Post[]> => {
    return jsonAdapter.read().posts;
  },
  addPost: async (post: any) => {
    const data = jsonAdapter.read();
    const newPost = { ...post, id: Date.now(), createdAt: new Date().toISOString() };
    data.posts.unshift(newPost);
    jsonAdapter.write(data);
    return newPost;
  },
  getLeads: async (): Promise<Lead[]> => {
    return jsonAdapter.read().leads;
  },
  addLead: async (lead: any) => {
    const data = jsonAdapter.read();
    const newLead = { ...lead, id: Date.now(), createdAt: new Date().toISOString() };
    data.leads.unshift(newLead);
    jsonAdapter.write(data);
    return newLead;
  }
};

// Initialize JSON DB immediately
jsonAdapter.init();

// ==========================================
// Strategy 2: Prisma (Production / Backend)
// ==========================================

// Global Prisma instance to prevent connection exhaustion in dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let prisma: PrismaClient | null = null;

// Only instantiate Prisma if database env vars are present
if (process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL) {
    try {
        prisma = globalForPrisma.prisma || new PrismaClient();
        if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
    } catch (e) {
        console.warn("Failed to initialize Prisma Client", e);
    }
}

// ==========================================
// Facade: Choose Strategy based on Env
// ==========================================
export const db = {
  getPosts: async (): Promise<Post[]> => {
    // If Prisma is available, use it
    if (prisma) {
        try {
          // @ts-ignore: Prisma types might differ slightly from interface
          const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
          return posts as unknown as Post[];
        } catch (e) {
          console.error("Prisma query failed, falling back to JSON", e);
        }
    }
    return jsonAdapter.getPosts();
  },
  addPost: async (post: Omit<Post, 'id' | 'createdAt'>) => {
    if (prisma) {
        try {
          // @ts-ignore
          return await prisma.post.create({ data: post });
        } catch (e) {
          console.error("Prisma create failed", e);
          throw e; // Don't fall back for writes to avoid data inconsistency
        }
    }
    return jsonAdapter.addPost(post);
  },
  getLeads: async (): Promise<Lead[]> => {
    if (prisma) {
        try {
          // @ts-ignore
          const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
          return leads as unknown as Lead[];
        } catch (e) {
          console.error("Prisma query failed", e);
        }
    }
    return jsonAdapter.getLeads();
  },
  addLead: async (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    if (prisma) {
        try {
          // @ts-ignore
          return await prisma.lead.create({ data: lead });
        } catch (e) {
          console.error("Prisma create failed", e);
          throw e;
        }
    }
    return jsonAdapter.addLead(lead);
  }
};
