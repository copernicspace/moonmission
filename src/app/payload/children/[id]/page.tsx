"use client";

import { useState, useEffect } from "react"; 
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

interface ChildRecord {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  user_id: string;
};

interface EditChildAssetProps {
  params: {
    id: string; 
  };
};

export default function EditChildAsset({ params }: EditChildAssetProps) {
  const { id } = params; 
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  const [record, setRecord] = useState<ChildRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      if (!id) return; 
      setLoading(true);

      const { data, error } = await supabase
        .from("childassets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Error fetching asset data");
        console.error(error);
      } else if (data) {
        setRecord(data);
        setTitle(data.title);
        setDescription(data.description);
        setThumbnail(data.thumbnail);
        setIsOwner(user?.id === data.user_id);
      }
      setLoading(false);
    };

    fetchAsset();
  }, [id, supabase, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("childassets")
      .update({ title, description, thumbnail })
      .eq("id", id);

    if (error) {
      setError("Error updating asset");
      console.error(error);
    } else {
      router.push(`/children/${id}`); // Navigate back to the asset page
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
      <h1 className="text-2xl font-bold mb-4">Edit Asset</h1>
      {isOwner && record ? (
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Edit: {record.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block font-semibold">Title</label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <label className="block font-semibold">Thumbnail URL</label>
                <Input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
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
        <p>You do not have permission to edit this asset.</p>
      )}
    </div>
  );
};