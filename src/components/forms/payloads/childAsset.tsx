"use client";

import React, { useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label"; 
import { ArrowRight } from "lucide-react";

export function CreateChildAssetFormComponent() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainMedia: null as File | null,
    mainFile: null as File | null,
    units: "",
    collection_id: null as number | null,
    parent_payload_id: null as number | null,
  });

  const [isCreatingNewCollection, setIsCreatingNewCollection] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData
  ) => {
    const { value, type, files } = e.target as HTMLInputElement;
    if (type === "file") {
      const file = files ? files[0] : null;
      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }));
      console.log(`${field} updated with file: `, file?.name);
    } else {
      // Convert empty strings to null for collection_id and parent_payload_id
      const newValue = value === "" && (field === "collection_id" || field === "parent_payload_id") 
        ? null 
        : value;
      setFormData((prevData) => ({
        ...prevData,
        [field]: newValue,
      }));
      console.log(`${field} updated with value: `, newValue);
    }
  };
  

  const handleCollectionCreated = (newCollectionId: number) => {
    setFormData((prevData) => ({
      ...prevData,
      collection_id: newCollectionId,
    }));
    setIsCreatingNewCollection(false);
    console.log("New collection created with ID: ", newCollectionId);
  };

  const createNewCollection = async () => {
    if (!newCollectionTitle) return;

    const { data, error } = await supabase.from("collections").insert({
      title: newCollectionTitle,
      user_id: session?.user?.id,
    }).select();

    if (error) {
      console.error("Error creating new collection: ", error.message);
      alert("Failed to create collection: " + error.message);
      return;
    }

    if (data && data.length > 0) {
      const newCollectionId = data[0].id;
      handleCollectionCreated(newCollectionId);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submit button pressed, form data: ", formData);

    let thumbnailUrl = "";
    let mainFileUrl = "";

    const generateUniqueFileName = (fileName: string) => {
      const timestamp = Date.now();
      const extension = fileName.split(".").pop();
      const nameWithoutExtension = fileName.replace(`.${extension}`, "");
      return `${nameWithoutExtension}_${timestamp}.${extension}`;
    };

    if (formData.mainMedia) {
      const uniqueMediaName = generateUniqueFileName(formData.mainMedia.name);
      const { data: mediaData, error: mediaError } = await supabase.storage
        .from("payload")
        .upload(
          `moonMission/child/${formData.title}/${uniqueMediaName}`,
          formData.mainMedia
        );
      if (mediaError) {
        console.error("Error uploading main media: ", mediaError.message);
        alert("Error uploading main media: " + mediaError.message);
        return;
      }
      thumbnailUrl = mediaData.path;
      console.log("Main media uploaded, path: ", thumbnailUrl);
    }

    if (formData.mainFile) {
      const uniqueFileName = generateUniqueFileName(formData.mainFile.name);
      const { data: fileData, error: fileError } = await supabase.storage
        .from("payload")
        .upload(
          `moonMission/child/${formData.title}/${uniqueFileName}`,
          formData.mainFile
        );
      if (fileError) {
        console.error("Error uploading main file: ", fileError.message);
        alert("Error uploading main file: " + fileError.message);
        return;
      }
      mainFileUrl = fileData.path; 
      console.log("Main file uploaded, path: ", mainFileUrl);
    }

    const { error: insertError } = await supabase.from("childassets").insert({
      title: formData.title,
      description: formData.description,
      thumbnail: thumbnailUrl,
      mainmedia: thumbnailUrl,
      mainfile: mainFileUrl,
      units: formData.units,
      collection_id: formData.collection_id,
      parent_payload_id: formData.parent_payload_id,
    });

    if (insertError) {
      console.error("Error inserting child asset: ", insertError.message);
      alert("Failed to create child asset: " + insertError.message);
      return;
    }

    console.log("Child asset created successfully!");
    alert("Child asset created successfully!");
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Create Child Asset (for Moon Mission)
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-semibold">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => handleChange(e, "title")}
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
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => handleChange(e, "description")}
                required
                className="w-full min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainMedia" className="text-lg font-semibold">
                Main Media
              </Label>
              <Input
                id="mainMedia"
                type="file"
                onChange={(e) => handleChange(e, "mainMedia")}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainFile" className="text-lg font-semibold">
                Main File
              </Label>
              <Input
                id="mainFile"
                type="file"
                onChange={(e) => handleChange(e, "mainFile")}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="units" className="text-lg font-semibold">
                Units
              </Label>
              <Input
                id="units"
                type="text"
                placeholder="Enter units"
                value={formData.units}
                onChange={(e) => handleChange(e, "units")}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection_id" className="text-lg font-semibold">
                Collection ID or Create New
              </Label>
              {!isCreatingNewCollection ? (
                <div>
                  <Input
                    id="collection_id"
                    type="number"
                    placeholder="Enter Collection ID"
                    value={formData.collection_id || ""}
                    onChange={(e) => handleChange(e, "collection_id")}
                    className="w-full"
                  />
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setIsCreatingNewCollection(true)}
                  >
                    Or create a new collection
                  </Button>
                </div>
              ) : (
                <div>
                  <Input
                    type="text"
                    placeholder="Enter New Collection Title"
                    value={newCollectionTitle}
                    onChange={(e) => setNewCollectionTitle(e.target.value)}
                    className="w-full"
                  />
                  <Button onClick={createNewCollection} className="mt-2">
                    Create Collection
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="parent_payload_id" className="text-lg font-semibold">
                Parent Payload ID
              </Label>
              <Input
                id="parent_payload_id"
                type="number"
                placeholder="Enter Parent Payload ID"
                value={formData.parent_payload_id || ""}
                onChange={(e) => handleChange(e, "parent_payload_id")}
                required
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 rounded-b-lg">
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
            >
              Create Child Asset
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};