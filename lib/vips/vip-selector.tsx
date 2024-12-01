'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Users } from 'lucide-react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { User } from '@/lib/db/schema'

type VIPType = 'judge' | 'speaker' | 'mentor' | 'sponsor'

export function VIPSelector() {
  const [type, setType] = useState<VIPType>('judge')
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [email, setEmail] = useState('')

  const { data: users = [] } = useQuery({
    queryKey: ['users', type, debouncedQuery],
    queryFn: async () => {
      const res = await fetch(`/api/users?type=${type}&query=${debouncedQuery}`)
      return res.json()
    },
  })

  const handleSubmitEmail = async () => {
    await fetch('/api/email-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, requestedType: type }),
    })
    setEmail('')
  }

  return (
    <div className="">
      <div className="md:col-span-2 space-y-6">
        <Tabs value={type} onValueChange={(value) => setType(value as VIPType)}>
          <TabsList className="bg-transparent">
            <TabsTrigger value="judge">Judges</TabsTrigger>
            <TabsTrigger value="speaker">Speakers</TabsTrigger>
            <TabsTrigger value="mentor">Mentors</TabsTrigger>
            <TabsTrigger value="sponsor">Sponsors</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div className="flex w-full gap-3 sm:flex-row flex-col">
            <div className="min-h-[450px] basis-[50%] bg-[#1B1B22] p-2 rounded-[12px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  className="pl-10 bg-[#2B2B31] border-zinc-800"
                  placeholder={`Search for ${type}s...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {users.map((user: User) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
                    onClick={() => setSelectedUsers([...selectedUsers, user])}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.some((u) => u.id === user.id)}
                      className="rounded-sm bg-zinc-800 border-zinc-700"
                      readOnly
                    />
                    <Image
                      src={user.imageUrl}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="basis-[50%] bg-[#1B1B22] rounded-[12px] p-6">
              {selectedUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-[#89898C]">
                  <Users className="w-12 h-12 mb-4 text-[#4E52F5]" />
                  <p>The {type}s you select on the left will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium">Invited</h3>
                  {selectedUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Image
                        src={user.imageUrl}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span>{user.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#89898C]">
              Can&apos;t find who you&apos;re looking for?
            </label>
            <Input
              className="bg-zinc-900 border-zinc-800"
              placeholder="Enter their email and we'll send them an invite"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmitEmail()}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-12 gap-3">
        <Button variant="outline" className="bg-[#424248] hover:bg-zinc-800">
          Save as draft
        </Button>
        <Button disabled variant="outline">
          Continue
        </Button>
      </div>
    </div>
  );
}

