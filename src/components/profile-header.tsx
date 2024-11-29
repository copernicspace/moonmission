'use client'

import { useState, useEffect } from "react";
import { Copy, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

export function ProfileHeader() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [profile, setProfile] = useState({
    title: "",
    wallet: "",
    username: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch profile data from the database
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, wallet, username")
        .eq("id", session?.user.id)
        .single();
      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile({
          title: data.full_name || "Copernic Space",
          wallet: data.wallet || "",
          username: data.username || "Ambassador",
        });
      }
    };
    fetchProfile();
  }, []);

  // Save changes to the database
  const saveChanges = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.title,
        wallet: profile.wallet,
        username: profile.username,
      })
      .eq("id", session?.user.id)
    if (error) {
      console.error("Error updating profile:", error);
    } else {
      setIsEditing(false);
    }
    setLoading(false);
  };

  return (
    <div className="pt-16">
      <div className="relative h-48 md:h-64 lg:h-80 w-full">
        <Image
          src="Melby.png"
          alt="Cover"
          className="object-cover"
          fill
          priority
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-4">
          <Image
            src="Arby.jpg"
            alt="Profile"
            width={160}
            height={160}
            className="rounded-full border-4 border-white"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1"
                    value={profile.wallet}
                    onChange={(e) =>
                      setProfile({ ...profile, wallet: e.target.value })
                    }
                  />
                ) : (
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {profile.wallet || "0xfeab...8c4c"}
                  </code>
                )}
                <button className="text-gray-500 hover:text-gray-700">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                {isEditing ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1"
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{profile.title}</h1>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    className="border rounded px-2 py-1"
                    value={profile.username}
                    onChange={(e) =>
                      setProfile({ ...profile, username: e.target.value })
                    }
                  />
                ) : (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1">
                    Ambassador
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isEditing ? (
                <Button variant="outline" onClick={saveChanges} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl">
            The Copernic Space Platform empowers you to become a stakeholder and
            player in the new space economy. The Copernic Space Platform empowers you to
            become a stakeholder and player in the new space economy new space economy.
          </p>
        </div>
      </div>
    </div>
  );
};