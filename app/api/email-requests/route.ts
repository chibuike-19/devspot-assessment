import { sql } from '../../../lib/pool'
import { NextResponse } from 'next/server'
import { EmailRequestSchema } from '@/lib/db/schema'
import { nanoid } from 'nanoid'

export async function POST(request: Request) {
  const body = await request.json()
  const { email, requestedType } = EmailRequestSchema.parse(body)

  await sql`
    INSERT INTO email_requests (id, email, requested_type)
    VALUES (${nanoid()}, ${email}, ${requestedType})
  `

  return NextResponse.json({ success: true })
}

