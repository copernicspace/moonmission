"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { Collection } from "types/collection"
import { CollectionCard } from "./collection-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// AssetsPage Component (Placeholder)
function AssetsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold">Assets Page</h1>
      <p>Content for the Assets tab goes here.</p>
    </div>
  )
}

// CollectionsPage Component
function CollectionsPage() {
  const supabase = createClientComponentClient()
  const [collections, setCollections] = useState<Collection[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("collections")
        .select("*")

      if (error) {
        console.error("Error fetching collections:", error.message)
      } else {
        setCollections(data || [])
      }
      setLoading(false)
    }

    fetchCollections()
  }, [supabase])

  const filteredCollections = collections.filter((collection) =>
    collection.name?.toLowerCase().includes(search.toLowerCase()) ||
    collection.basedOn?.toLowerCase().includes(search.toLowerCase())
  )

  const sortByName = () => {
    setCollections([...collections].sort((a, b) => (a.name || "").localeCompare(b.name || "")))
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Show All</DropdownMenuItem>
              <DropdownMenuItem>Moon Mission Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={sortByName}>Sort by Name</DropdownMenuItem>
              <DropdownMenuItem>Sort by Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {loading ? (
        <div>Loading collections...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredCollections.map((collection) => (
            <div key={collection.id}>
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Parent Component
export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState<"assets" | "collections">("collections")

  return (
    <div>
      <div className="border-b mb-6">
        <div className="flex gap-6 mb-2">
          <button
            onClick={() => setActiveTab("assets")}
            className={`text-gray-500 pb-2 ${
              activeTab === "assets" ? "text-gray-900 border-b-2 border-blue-600" : ""
            }`}
          >
            Assets
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={`text-gray-500 pb-2 ${
              activeTab === "collections" ? "text-gray-900 border-b-2 border-blue-600" : ""
            }`}
          >
            Collections
          </button>
        </div>
      </div>

      {activeTab === "assets" ? <AssetsPage /> : <CollectionsPage />}
    </div>
  )
};