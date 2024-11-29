import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface Collection {
  id: number; // Collection ID
  name: string; // Collection name
  basedOn?: string; // Based on (optional)
  cover_image: string; // Cover image URL
  created_at: string; // Timestamp of creation
  itemCount: number; // Number of child assets (calculated dynamically)
};

interface CollectionCardProps {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const supabase = createClientComponentClient()
  const [childAssetsCount, setChildAssetsCount] = useState<number>(0)

  useEffect(() => {
    const fetchChildAssetsCount = async () => {
      if (collection.id) {
        const { count, error } = await supabase
          .from("childassets")
          .select("id", { count: "exact" })
          .eq("collection_id", collection.id)

        if (error) {
          console.error("Error fetching child assets count:", error.message)
        } else {
          setChildAssetsCount(count || 0)
        }
      }
    }

    fetchChildAssetsCount()
  }, [collection.id, supabase])

  if (!collection) {
    return null
  }

  return (
    <div className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
      {/* Cover Image */}
      <div className="relative w-full aspect-square mb-4">
        {collection.cover_image ? (
          <img
            src={collection.cover_image}
            alt={collection.name || "Collection Cover"}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Collection Details */}
      <div className="space-y-1">
        <h3 className="font-medium text-lg">{collection.name || "Untitled Collection"}</h3>
        <div className="text-sm text-gray-600">
          Based on: <span className="text-blue-600 hover:underline">{collection.basedOn || "Unknown"}</span>
        </div>
        <div className="text-sm text-gray-600">
          Items: <span className="font-medium">{childAssetsCount}</span>
        </div>
      </div>
    </div>
  )
};