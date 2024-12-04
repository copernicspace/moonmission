"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Upload, File, LinkIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

interface AssetFormProps {
  initialData?: any
  readOnly?: boolean
}

export function AssetForm({ initialData, readOnly = false }: AssetFormProps) {
  const supabase = useSupabaseClient();
  const session = useSession();

  const router = useRouter()
  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Space asset"])
  const [files, setFiles] = useState<{ name: string; type: string }[]>([])
  const [links, setLinks] = useState<string[]>([])
  const [newLink, setNewLink] = useState("");
  const [assetName, setAssetName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const types = ["Space asset", "Satellite", "Imagery"]

  useEffect(() => {
    return () => {
      if (mainImage) URL.revokeObjectURL(mainImage)
      additionalImages.forEach(img => URL.revokeObjectURL(img))
    }
  }, [mainImage, additionalImages])


  const handleEdit = () => {
    router.push("/assets/edit/1")
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!session?.user) return;
  
    const files = event.target.files;
  
    if (!files) return;
  
    const uploadedPaths: string[] = [];
  
    for (const file of Array.from(files)) {
      const uniqueFileName = `${Date.now()}_${file.name}`; // Unique file name
      const { data, error } = await supabase.storage
        .from("payload")
        .upload(uniqueFileName, file);  // Upload directly to root, no folder
  
      if (error) {
        console.error("Image upload failed:", error.message);
        continue;
      }
  
      if (data?.path) {
        uploadedPaths.push(data.path);
      }
    }
  
    if (uploadedPaths.length > 0) {
      if (!mainImage) {
        setMainImage(uploadedPaths[0]);
        setAdditionalImages((prevImages) =>
          [...prevImages, ...uploadedPaths.slice(1)].slice(0, 3)
        );
      } else {
        setAdditionalImages((prevImages) =>
          [...prevImages, ...uploadedPaths].slice(0, 3)
        );
      }
    }
  };
  
  const handleSave = async () => {
    if (!session?.user) {
      alert("You must be logged in to create an asset.");
      return;
    }
  
    setIsSaving(true);
  
    try {
      let mainImagePath = null;
      const additionalImagePaths: string[] = [];
  
      // Upload Main Image
      if (mainImage) {
        const uniqueFileName = `${Date.now()}_${mainImage.split('/').pop()}`;
        const { data, error } = await supabase.storage
          .from("payload")
          .upload(uniqueFileName, mainImage);  // Upload directly to root, no folder
  
        if (error) {
          console.error("Main image upload failed:", error.message);
          throw new Error("Main image upload failed");
        }
  
        if (data?.path) {
          mainImagePath = data.path;
        }
      }
  
      // Upload Additional Images
      for (const image of additionalImages) {
        const uniqueFileName = `${Date.now()}_${image.split('/').pop()}`;
        const { data, error } = await supabase.storage
          .from("payload")
          .upload(uniqueFileName, image);  // Upload directly to root, no folder
  
        if (error) {
          console.error(`Additional image upload failed: ${error.message}`);
          continue;
        }
  
        if (data?.path) {
          additionalImagePaths.push(data.path);
        }
      }
  
      const { error } = await supabase.from("childassets").insert({
        title: assetName,
        description,
        main_image: mainImagePath,
        thumbnail: mainImagePath,
        mainmedia: mainImagePath,
        units: 1,
        parent_payload_id: 1,
        mainfile: mainImagePath,
        additional_images: additionalImagePaths,
        files,
        links,
        author: session.user.id,
      });
  
      if (error) {
        console.error("Asset creation failed:", error.message);
        alert("Failed to create asset: " + error.message);
        return;
      }
  
      alert("Asset created successfully!");
      router.push("/"); 
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the asset.");
    } finally {
      setIsSaving(false);
    }
  };  

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(file => ({ name: file.name, type: file.type }))
      setFiles(prevFiles => [...prevFiles, ...newFiles])
    }
  }

  const handleAddLink = () => {
    if (newLink) {
      setLinks(prevLinks => [...prevLinks, newLink])
      setNewLink("")
    };
  };

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
        <div className="space-y-6">
          <div>
            <Label>Main Image</Label>
            <div className="mt-2 border rounded-lg overflow-hidden aspect-4/3">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt="Main asset image"
                  layout="responsive"
                  width={800}
                  height={600}
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">No image uploaded</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Additional images</Label>
            <div className="mt-2 grid grid-cols-3 gap-4">
              {additionalImages.map((image, index) => (
                <div key={index} className="border rounded-lg overflow-hidden aspect-square">
                  <Image
                    src={image}
                    alt={`Additional image ${index + 1}`}
                    layout="responsive"
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                </div>
              ))}
              {Array.from({ length: 3 - additionalImages.length }).map((_, index) => (
                <div key={`empty-${index}`} className="border rounded-lg overflow-hidden aspect-square flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">No image</p>
                </div>
              ))}
            </div>
            {!readOnly && (
              <Button variant="outline" className="w-full mt-4" onClick={() => imageInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Upload image
              </Button>
            )}
            <input
              type="file"
              ref={imageInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
              multiple
            />
          </div>
        </div>

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
              onChange={(e) => setAssetName(e.target.value)} 
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Input description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
              rows={5}
              readOnly={readOnly}
            />
          </div>

          <div>
            <Label>Type</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {types.map((type) => (
                <Badge
                  key={type}
                  variant={selectedTypes.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => !readOnly && setSelectedTypes(prev => 
                    prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                  )}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label>Files & links</Label>
            <div className="mt-2 space-y-4">
              {files.length === 0 && links.length === 0 ? (
                <div className="text-muted-foreground">No files attached</div>
              ) : (
                <>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded">
                        <File className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div>{file.name}</div>
                      </div>
                    </div>
                  ))}
                  {links.map((link, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div>{link}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {!readOnly && (
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload file
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        Add link
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add a link</DialogTitle>
                      </DialogHeader>
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Enter link URL"
                          value={newLink}
                          onChange={(e) => setNewLink(e.target.value)}
                        />
                        <Button onClick={handleAddLink}>Add</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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
  );
};