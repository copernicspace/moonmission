"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "./rich-text-editor"
import { Badge } from "@/components/ui/badge"

interface AssetFormProps {
  initialData?: any
  readOnly?: boolean
}

export function AssetForm({ initialData, readOnly = false }: AssetFormProps) {
  const router = useRouter()
  const [mainImage, setMainImage] = useState<string>("/placeholder.svg")
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Space asset"])

  const types = ["Space asset", "Satellite", "Imagery"]

  const handleSave = async () => {
    // Handle form submission
    router.push("/assets/view/1") // Navigate to view mode
  }

  const handleEdit = () => {
    router.push("/assets/edit/1") // Navigate to edit mode
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create an Asset</h1>
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
        <div className="space-y-6">
          <div>
            <Label>Main Image</Label>
            <div className="mt-2 border rounded-lg overflow-hidden">
              <Image
                src={mainImage}
                alt="Main asset image"
                width={800}
                height={600}
                className="w-full aspect-4/3 object-cover"
              />
            </div>
          </div>

          <div>
            <Label>Additional images</Label>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt={`Additional image ${i + 1}`}
                    width={200}
                    height={200}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
            {!readOnly && (
              <Button variant="outline" className="w-full mt-4">
                <Upload className="w-4 h-4 mr-2" />
                Upload file
              </Button>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="collection">Collection*</Label>
            <div className="mt-2 flex gap-4">
              <Button variant="outline" className="flex-1">
                Choose existing
              </Button>
              <Button variant="outline" className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Create new
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Input your asset name"
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

          <div>
            <Label>Type</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {types.map((type) => (
                <Badge
                  key={type}
                  variant={selectedTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => !readOnly && setSelectedTypes([...selectedTypes, type])}
                >
                  {type}
                </Badge>
              ))}
              {!readOnly && (
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add type
                </Button>
              )}
            </div>
          </div>

          <div>
            <Label>Files & links</Label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded">doc</div>
                <div className="flex-1">
                  <div>File_for_upload.doc</div>
                  <div className="text-sm text-muted-foreground">6.5 mb</div>
                </div>
              </div>
              {!readOnly && (
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload file
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Add link
                  </Button>
                </div>
              )}
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

