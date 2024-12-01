import { sql } from "../../../lib/pool"
import { notFound } from 'next/navigation'

export default async function ProfilePage({ params }: { params: { id: string } }) {
  console.log(sql);
  const result = await sql`
    SELECT * FROM users WHERE id = ${params.id}
  `

  if (result.rows.length === 0) {
    notFound()
  }

  const user = result.rows[0]

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <p className="text-zinc-400">{user.role}</p>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          {user.is_open_to_work && (
            <span className="inline-block px-3 py-1 text-sm bg-green-900 text-green-400 rounded-full">
              Open for work
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

