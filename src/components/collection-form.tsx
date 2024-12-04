"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "./rich-text-editor"

interface CollectionFormProps {
  initialData?: any
  readOnly?: boolean
}

export function CollectionForm({ initialData, readOnly = false }: CollectionFormProps) {
  const router = useRouter()
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [description, setDescription] = useState("")

  const handleSave = async () => {
    // Handle form submission
    router.push("/collections/view/1") // Navigate to view mode
  }

  const handleEdit = () => {
    router.push("/collections/edit/1") // Navigate to edit mode
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create a Collection</h1>
          <p className="text-muted-foreground">
            Once your item is minted you will not be able to change any of its info
          </p>
        </div>
        {readOnly && (
          <Button onClick={handleEdit} variant="outline">
            Edit
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <div>
            <Label>Main Image</Label>
            <div className="mt-2 border rounded-lg bg-muted/50">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt="Collection cover"
                  width={800}
                  height={600}
                  className="w-full aspect-4/3 object-cover rounded-lg"
                />
              ) : (
                <div className="aspect-4/3 flex flex-col items-center justify-center p-8 text-center">
                  {!readOnly && (
                    <>
                      <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                      <div className="font-medium mb-1">Upload file</div>
                      <div className="text-sm text-muted-foreground">
                        Max size: 50MB. JPG, PNG, GIF, SVG, MP4
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Input your collection name"
              className="mt-2"
              readOnly={readOnly}
            />
          </div>

          <div>
            <Label>Description</Label>
            <div className="mt-2">
              <RichTextEditor
                value={description}
                onChange={setDescription}
                readOnly={readOnly}
              />
            </div>
          </div>

          {!readOnly && (
            <Button onClick={handleSave} className="w-full">
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

