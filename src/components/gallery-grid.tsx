'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileIcon, ImageIcon, InfoIcon, PackageIcon } from "lucide-react"

interface Record {
  id: number
  title: string
  description: string
  mainMedia: string
  mainFile: string
  units: string
  collection_id: number
  parent_payload_id: number
}

const mockData: Record[] = [
  {
    id: 1,
    title: "Asset 1",
    description: "This is the first asset",
    mainMedia: "/placeholder.svg?height=100&width=100",
    mainFile: "file1.pdf",
    units: "kg",
    collection_id: 1,
    parent_payload_id: 0
  },
  {
    id: 2,
    title: "Asset 2",
    description: "This is the second asset",
    mainMedia: "/placeholder.svg?height=100&width=100",
    mainFile: "file2.pdf",
    units: "m",
    collection_id: 1,
    parent_payload_id: 1
  },
  // Add more mock data as needed
]

export function GalleryGridComponent() {
  const [records, setRecords] = useState<Record[]>(mockData)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRecords = records.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Gallery</h1>
      <Input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{record.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="aspect-square bg-gray-200 mb-2 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{record.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <PackageIcon className="w-4 h-4 mr-1" />
                <span>{record.units}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FileIcon className="w-4 h-4 mr-1" />
                <span>{record.mainFile}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <InfoIcon className="w-4 h-4 mr-1" />
                Details
              </Button>
              <div className="text-sm text-gray-500">
                ID: {record.id}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}