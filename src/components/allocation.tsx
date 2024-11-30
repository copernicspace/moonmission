"use client";

import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export function UnregisteredAssetGrid() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [allocation, setAllocation] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllocation() {
      const { data, error } = await supabase
        .from("profiles")
        .select("allocation")
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        console.error("Error fetching allocation:", error);
      } else {
        setAllocation(data?.allocation || 0);
      }
      setLoading(false);
    }

    fetchAllocation();
  }, [supabase]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Unregistered Assets</h2>
      <Link href="/assets/create"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: allocation || 0 }).map((_, index) => (
          <button
            key={index}
            className="w-64 h-64 bg-white border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 transition"
            onClick={() => console.log("Creating child asset...")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 mb-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.5l4 4m0 0l-4 4m4-4H10"
              />
            </svg>
            Create child asset
          </button>
        ))}
      </div></Link>
    </div>
  );
};