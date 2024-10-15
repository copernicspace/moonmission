"use client";

import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type ChildAsset = {
  title: string 
  thumbnail: string
  mainmedia: string
  description: string
  units: string
  collection_id: number | null
  parent_payload_id: number
  created_at: string
};

export function ChildAssetsGridComponent() {
  const [assets, setAssets] = useState<ChildAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();

  useEffect(() => {
    async function fetchAssets() {
      const { data, error } = await supabase
        .from("childassets")
        .select("title, thumbnail, mainmedia, description, units, collection_id, parent_payload_id, created_at")

      if (error) {
        console.error("Error fetching child assets:", error)
      } else {
        setAssets(data || [])
      };
      setLoading(false)
    };

    fetchAssets()
  }, [supabase]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {assets.map((asset, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative pb-[100%]">
            <img
              src={asset.thumbnail}
              alt={asset.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2 truncate">{asset.title}</h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{asset.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {asset.units} Units
              </Badge>
              {asset.collection_id && (
                <Badge variant="outline" className="text-xs">
                  Collection: {asset.collection_id}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                Parent: {asset.parent_payload_id}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-2 text-xs text-gray-500">
            Created: {new Date(asset.created_at).toLocaleDateString()}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};