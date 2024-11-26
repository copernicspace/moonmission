"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type ChildAsset = {
  id: number;
  title: string;
  thumbnail: string;
  mainmedia: string;
  description: string;
  units: string;
  collection_id: number | null;
  parent_payload_id: number;
  created_at: string;
};

export function AssetGrid() {
  const [assets, setAssets] = useState<ChildAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = useSupabaseClient();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    async function fetchAssets() {
      const { data, error } = await supabase
        .from("childassets")
        .select(
          "id, title, thumbnail, mainmedia, description, units, collection_id, parent_payload_id, created_at"
        );

      if (error) {
        console.error("Error fetching assets:", error);
      } else {
        setAssets(data || []);
      }
      setLoading(false);
    }

    fetchAssets();
  }, [supabase]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 border-b mb-6">
        <button className="px-4 py-2 font-medium text-sm border-b-2 border-blue-600 text-blue-600">
          Assets
        </button>
        <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700">
          Collections
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <Input type="search" placeholder="Search" className="w-full" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <SortAsc className="w-4 h-4" />
          Sort
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {assets.map((asset) => {
          const imageUrl = `${supabaseUrl}/storage/v1/object/public/payload/${asset.thumbnail}`;
          return (
            <div
              key={asset.id}
              className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square">
                <Image
                  src={imageUrl}
                  alt={asset.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">
                  {/* Based on Parent Payload:{" "} */}
                  Based on: <span className="text-blue-500">Moon Mission</span>
                  {/* <span className="text-blue-600">{asset.parent_payload_id}</span> */}
                </div>
                <h3 className="font-medium">{asset.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {asset.description}
                </p>
                <div className="text-xs text-gray-400 mt-2">
                  Units: {asset.units}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};