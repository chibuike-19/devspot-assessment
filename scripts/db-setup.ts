import { sql } from "../lib/pool";
import { nanoid } from "nanoid";

async function setupDatabase() {
  // Create tables
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
  `;

  // Insert mock data
  const mockUsers = [
    {
      name: "Alice Johnson",
      role: "Senior Judge",
      type: "judge",
      imageUrl: "https://i.pravatar.cc/150?u=alice",
      isOpenToWork: false,
    },
    {
      name: "Bob Smith",
      role: "Tech Speaker",
      type: "speaker",
      imageUrl: "https://i.pravatar.cc/150?u=bob",
      isOpenToWork: true,
    },
    {
      name: "Carol Williams",
      role: "Startup Mentor",
      type: "mentor",
      imageUrl: "https://i.pravatar.cc/150?u=carol",
      isOpenToWork: false,
    },
    {
      name: "David Brown",
      role: "Corporate Sponsor",
      type: "sponsor",
      imageUrl: "https://i.pravatar.cc/150?u=david",
      isOpenToWork: false,
    },
    {
      name: "Eva Davis",
      role: "AI Judge",
      type: "judge",
      imageUrl: "https://i.pravatar.cc/150?u=eva",
      isOpenToWork: true,
    },
    {
      name: "Frank Miller",
      role: "Blockchain Speaker",
      type: "speaker",
      imageUrl: "https://i.pravatar.cc/150?u=frank",
      isOpenToWork: false,
    },
    {
      name: "Grace Lee",
      role: "UX Mentor",
      type: "mentor",
      imageUrl: "https://i.pravatar.cc/150?u=grace",
      isOpenToWork: true,
    },
    {
      name: "Henry Wilson",
      role: "Angel Investor",
      type: "sponsor",
      imageUrl: "https://i.pravatar.cc/150?u=henry",
      isOpenToWork: false,
    },
  ];

  for (const user of mockUsers) {
    await sql`
      INSERT INTO users (id, name, role, type, image_url, is_open_to_work)
      VALUES (${nanoid()}, ${user.name}, ${user.role}, ${user.type}, ${
      user.imageUrl
    }, ${user.isOpenToWork})
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  console.log("Database setup complete!");
}

setupDatabase().catch(console.error);
