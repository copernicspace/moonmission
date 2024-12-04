"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "../../rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

interface AssetFormProps {
  initialData?: any;
  readOnly?: boolean;
}

export function AssetForm({ initialData, readOnly = false }: AssetFormProps) {
  const router = useRouter();
  
  const supabase = useSupabaseClient();
  const session = useSession();

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Space asset"]);
  const [isSaving, setIsSaving] = useState(false);

  const types = ["Space asset", "Satellite", "Imagery"];

  const handleImageUpload = async (file: File, folder: string) => {
    const uniqueFileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("payload")
      .upload(`${folder}/${uniqueFileName}`, file);

    if (error) {
      console.error("Image upload failed:", error.message);
      return null;
    };

    return data?.path || null;
  };

  const handleSave = async () => {
    if (!session?.user) {
      alert("You must be logged in to create an asset.");
      return;
    };

    setIsSaving(true);

    try {
      let mainImagePath = null;
      const additionalImagePaths: string[] = [];

      if (mainImage) {
        mainImagePath = await handleImageUpload(mainImage, "main");
        if (!mainImagePath) throw new Error("Main image upload failed");
      };

      for (const image of additionalImages) {
        const path = await handleImageUpload(image, "additional");
        if (path) {
          additionalImagePaths.push(path);
        };
      };

      const { error } = await supabase.from("assets").insert({
        title,
        description,
        type: selectedTypes.join(", "),
        main_image: mainImagePath,
        author: session?.user.id,
        additional_images: additionalImagePaths,
        user_id: session.user.id,
      });

      if (error) {
        console.error("Asset creation failed:", error.message);
        alert("Failed to create asset: " + error.message);
        return;
      };

      alert("Asset created successfully!");
      router.push("/assets"); // Navigate to asset list or view page
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the asset.");
    } finally {
      setIsSaving(false);
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isMain = false) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (isMain) {
        setMainImage(files[0]);
      } else {
        setAdditionalImages((prev) => [...prev, ...Array.from(files)]);
      }
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Create an Asset</h1>
          <p className="text-muted-foreground">Fill out the form to create a new asset.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter asset title"
            disabled={readOnly}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <RichTextEditor
  value={description}
  onChange={(value) => setDescription(value)}
  readOnly={readOnly}
/>
        </div>

        <div>
          <Label htmlFor="mainImage">Main Image</Label>
          <Input
            id="mainImage"
            type="file"
            onChange={(e) => handleFileChange(e, true)}
            disabled={readOnly}
          />
          {mainImage && (
            <Image
              src={URL.createObjectURL(mainImage)}
              alt="Main Image Preview"
              width={100}
              height={100}
              className="mt-2"
            />
          )}
        </div>

        <div>
          <Label htmlFor="additionalImages">Additional Images</Label>
          <Input
            id="additionalImages"
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={readOnly}
          />
          <div className="flex space-x-2 mt-2">
            {additionalImages.map((img, index) => (
              <Image
                key={index}
                src={URL.createObjectURL(img)}
                alt={`Additional Image ${index + 1}`}
                width={50}
                height={50}
                className="border"
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Types</Label>
          <div className="flex space-x-2 mt-2">
            {types.map((type) => (
              <Badge
                key={type}
                className={`cursor-pointer ${
                  selectedTypes.includes(type) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => !readOnly && toggleType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {!readOnly && (
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Asset"}
          </Button>
        )}
      </div>
    </div>
  );
};