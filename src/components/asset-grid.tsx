"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { CollectionCard } from "./collection-card"; // Assuming CollectionCard exists for displaying collections
import { UnregisteredAssetGrid } from "./allocation";

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
  const session = useSession();

  const [assets, setAssets] = useState<ChildAsset[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"assets" | "collections">("assets");
  const [search, setSearch] = useState("");
  const supabase = useSupabaseClient();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    async function fetchAssets() {
      const { data, error } = await supabase
        .from("childassets")
        .select(
          "id, title, thumbnail, mainmedia, description, author, units, collection_id, parent_payload_id, created_at"
        )
        .eq('author', session?.user.id);

      if (error) {
        console.error("Error fetching assets:", error);
      } else {
        setAssets(data || []);
      }
      setLoading(false);
    }

    async function fetchCollections() {
      const { data, error } = await supabase.from("collections").select("*");

      if (error) {
        console.error("Error fetching collections:", error);
      } else {
        setCollections(data || []);
      }
    }

    fetchAssets();
    fetchCollections();
  }, [supabase]);

  const filteredCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(search.toLowerCase()) ||
      collection.basedOn.toLowerCase().includes(search.toLowerCase())
  );

  const sortByName = () => {
    setCollections([...collections].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortByDate = () => {
    setCollections([...collections].sort((a, b) => b.id - a.id)); // Replace `id` with a proper date field if available
  };

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
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("assets")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "assets"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Assets
        </button>
        <button
          onClick={() => setActiveTab("collections")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "collections"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Collections
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "assets" ? (
        <div>
          {/* Conditional Rendering for Assets */}
          {assets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
{assets.map((asset) => {
                const imageUrl = asset.thumbnail
                  ? `${supabaseUrl}/storage/v1/object/public/payload/${encodeURIComponent(asset.thumbnail)}`
                  : "/path/to/default/image.jpg"; // Replace with a fallback image path
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
                        Based on: <span className="text-blue-500">Moon Mission</span>
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
          ) : (
            <UnregisteredAssetGrid />
          )}
        </div>
      ) : (
        <div>
          {/* Search, Filter, and Sort */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Show All</DropdownMenuItem>
                  <DropdownMenuItem>Moon Mission Only</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={sortByName}>Sort by Name</DropdownMenuItem>
                  <DropdownMenuItem onClick={sortByDate}>Sort by Date</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};