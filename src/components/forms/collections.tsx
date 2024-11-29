"use client"

import React, { useState } from "react"
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

interface CreateNewCollectionProps {
    onCollectionCreated?: (newCollectionId: number) => void;
};

const generateUniqueFileName = (fileName: string): string => {
  const timestamp = Date.now();
  const extension = fileName.split(".").pop() || "";
  const nameWithoutExtension = fileName.replace(`.${extension}`, "");
  return `${nameWithoutExtension}_${timestamp}.${extension}`;
};

const CreateNewCollectionComponent: React.FC<CreateNewCollectionProps> = ({ onCollectionCreated }) => {
  const supabase = useSupabaseClient()
  const session = useSession()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cover_image: null as File | null,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData
  ) => {
    const { value, type, files } = e.target as HTMLInputElement
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [field]: files ? files[0] : null,
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }))
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!session?.user?.id) {
      alert("You must be logged in to create a collection.");
      return;
    }
  
    let coverImageUrl = "";
  
    if (formData.cover_image) {
      const uniqueMediaName = generateUniqueFileName(formData.cover_image.name);
      const { data: mediaData, error: mediaError } = await supabase.storage
        .from("payload")
        .upload(
          `moonMission/collection/${formData.name}/${uniqueMediaName}`,
          formData.cover_image
        );
  
      if (mediaError) {
        console.error("Error uploading cover image: ", mediaError.message);
        alert("Error uploading cover image: " + mediaError.message);
        return;
      }
  
      const { data: urlData } = supabase.storage
        .from("payload")
        .getPublicUrl(`moonMission/collection/${formData.name}/${uniqueMediaName}`);
  
      coverImageUrl = urlData?.publicUrl || "";
    }
  
    if (!coverImageUrl) {
      alert("Cover image upload failed. Please try again.");
      return;
    }
  
    const collectionData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      cover_image: coverImageUrl,
      creator: session.user.id,
    };
  
    console.log("Payload to be inserted:", collectionData);
  
    const { data: insertedData, error: insertError } = await supabase
      .from("collections")
      .insert(collectionData)
      .select(); // Fetch the inserted data.
  
    if (insertError) {
      console.error("Error inserting collection: ", insertError.message);
      alert("Error inserting collection: " + insertError.message);
      return;
    }
  
    alert("Collection created successfully!");
    
    if (insertedData && insertedData.length > 0 && onCollectionCreated) {
      onCollectionCreated(insertedData[0].id);
    }
  };
  

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Create New Collection
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter collection name"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter collection description"
                value={formData.description}
                onChange={(e) => handleChange(e, "description")}
                required
                className="w-full min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover_image" className="text-lg font-semibold">
                Cover Image
              </Label>
              <Input
                id="cover_image"
                type="file"
                onChange={(e) => handleChange(e, "cover_image")}
                required
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 rounded-b-lg">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Create Collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateNewCollectionComponent