"use client"

import { useCallback, useEffect, useState } from "react"
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

export default function ProfileUpdateForm() {
  const supabase = useSupabaseClient()
  const session = useSession()

  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from("profiles")
        .select("full_name, username, avatar_url")
        .eq("id", session?.user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }, [session, supabase])

  useEffect(() => {
    getProfile()
  }, [session, getProfile])

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: session?.user.id,
          full_name: fullname,
          username,
          avatar_url,
          updated_at: new Date().toISOString(),
        })

      if (error) {
        throw error
      }

      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <form onSubmit={updateProfile}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Update Your Profile
            </CardTitle>
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-1 text-primary">
                <User size={24} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="Full Name"
                value={fullname || ''}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar_url">Avatar URL</Label>
              <Input
                id="avatar_url"
                type="text"
                placeholder="Avatar URL"
                value={avatar_url || ''}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}