import { sql } from '@vercel/postgres'
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.enum(['judge', 'speaker', 'mentor', 'sponsor']),
  imageUrl: z.string(),
  isOpenToWork: z.boolean(),
})

export const EmailRequestSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  requestedType: z.enum(['judge', 'speaker', 'mentor', 'sponsor']),
  createdAt: z.date(),
})

export type User = z.infer<typeof UserSchema>
export type EmailRequest = z.infer<typeof EmailRequestSchema>

// Database initialization
export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      type TEXT NOT NULL,
      image_url TEXT NOT NULL,
      is_open_to_work BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS email_requests (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      requested_type TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `
}

