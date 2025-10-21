// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Import loader(s)
import { glob } from 'astro/loaders'

// 3. Define your collection(s)
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
})

const products = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    affiliateUrl: z.string().url(),
    image: z.string().optional(),
  }),
})

// 4. Export a single `collections` object to register you collection(s)
export const collections = { projects, products }
