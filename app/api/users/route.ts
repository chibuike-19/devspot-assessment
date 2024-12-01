import { sql } from '../../../lib/pool'
import { NextResponse } from 'next/server'
import { UserSchema } from '@/lib/db/schema'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query') || ''
  const type = searchParams.get('type') || 'judge'

  const users = await sql`
    SELECT * FROM users 
    WHERE type = ${type}
    AND name ILIKE ${`%${query}%`}
    LIMIT 10
  `

  const parsedUsers = users.rows.map(user => ({
    id: user.id,
    name: user.name,
    role: user.role,
    type: user.type,
    imageUrl: user.image_url,
    isOpenToWork: user.is_open_to_work,
  }))

  return NextResponse.json(parsedUsers)
}

