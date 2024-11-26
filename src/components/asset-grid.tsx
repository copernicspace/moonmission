import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, SortAsc } from "lucide-react"

export function AssetGrid() {
  const assets = Array(5).fill({
    image: "/placeholder.svg?height=400&width=400",
    mission: "Moon mission",
    name: "Child payload NAME"
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 border-b mb-6">
        <button className="px-4 py-2 font-medium text-sm border-b-2 border-blue-600 text-blue-600">Items</button>
        <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700">Activity</button>
      </div>
      
      <div className="flex gap-4 border-b mb-6">
        <button className="px-4 py-2 font-medium text-sm border-b-2 border-blue-600 text-blue-600">Assets</button>
        <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700">Collections</button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <Input type="search" placeholder="Search" className="w-full" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <SortAsc className="w-4 h-4" />
          Sort
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {assets.map((asset, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <Image
                src={asset.image}
                alt={asset.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-2">
                Based on: <span className="text-blue-600">{asset.mission}</span>
              </div>
              <h3 className="font-medium">{asset.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

