"use client";

import React, { useState, useEffect } from "react";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

interface CollectionRecord {
  id: number;
  name: string; 
  description: string;
  cover_image: string; 
  creator: string; 
};

interface EditCollectionProps {
  params: {
    id: string;
  };
};

export default function EditCollection({ params }: EditCollectionProps) {
  const { id } = params;
  const router = useRouter();
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();

  const [record, setRecord] = useState<CollectionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(""); 

  useEffect(() => {
    const fetchCollection = async () => {
      if (!id) return; 
      setLoading(true);

      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Error fetching collection data");
        console.error(error);
      } else if (data) {
        setRecord(data);
        setName(data.name); 
        setDescription(data.description);
        setCoverImage(data.cover_image);
        setIsOwner(user?.id === data.creator); 
      }
      setLoading(false);
    };

    fetchCollection();
  }, [id, supabase, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("collections")
      .update({ name, description, cover_image: coverImage }) 
      .eq("id", id);

    if (error) {
      setError("Error updating collection");
      console.error(error);
    } else {
      router.push(`/collections/${id}`); 
    }

    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="py-1">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Collection</h1>
      {isOwner && record ? (
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Edit: {record.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block font-semibold">Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold">Cover Image URL</label>
                <Input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" variant="default" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      ) : (
        <p>You do not have permission to edit this collection.</p>
      )}
    </div>
  );
};