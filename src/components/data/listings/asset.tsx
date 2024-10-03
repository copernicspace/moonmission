"use client";

import Image from "next/image";
import { FileText, Globe, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

interface ListingProps {
    params: {
        id: string;
    };
};

interface ChildRecord {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    user_id: string;
};

export default function AssetListingComponent({ params }: ListingProps) {
  const supabase = useSupabaseClient();
  const session = useSession();

  const { id } = params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [record, setRecord] = useState<ChildRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

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
        setIsOwner(session?.user?.id === data.user_id);
      }
      setLoading(false);
    };

    fetchAsset();
  }, [id, supabase, session?.user]);

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Image
            src="/placeholder.svg"
            alt="Lunar Rover"
            width={600}
            height={400}
            className="w-full rounded-lg object-cover"
          />
          <div className="flex space-x-2 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src="/placeholder.svg"
                alt={`Thumbnail ${i}`}
                width={100}
                height={100}
                className="h-20 w-20 rounded object-cover"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {title}
            </h1>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
              Verified
            </span>
          </div>
          <div>
            <span className="text-3xl font-bold text-green-600">$4,250</span>
            <span className="text-sm text-gray-500"> / g</span>
          </div>
        </div>

        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Choose amount:</span>
                <span className="text-sm font-medium">100g</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Min: 100g</span>
                <span>Available: 3,500g</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-lg font-semibold">Subtotal:</span>
              <span className="text-2xl font-bold text-green-600">
                {" "}
                $425,000
              </span>
            </div>
            <Button className="w-full bg-green-500 text-white hover:bg-green-600">
              Request
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold text-green-700">
              Description
            </h2>
            <p className="text-sm text-gray-600">
              Payload options provided by Lunar Outpost. Offer price includes
              launch & lander fees. Purchase payload space for lunar lander
              missions. Purchase space for science instruments and cargo to the
              lunar surface on our rover.
            </p>
            <ul className="mt-4 list-inside list-disc text-sm text-gray-600">
              <li>Up to 3.5kg payload space per mission</li>
              <li>
                Payload space available in 100g increments for a total of 3.5
                kilograms of payload available per mission
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-4 text-lg font-semibold text-green-700">
              Documentation & Files
            </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="bg-gray-200 rounded-md p-2">
                  <ImageIcon className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Image.png</p>
                  <p className="text-xs text-gray-500">6.5 mb • File</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="bg-gray-200 rounded-md p-2">
                  <FileText className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">File_for_upload.doc</p>
                  <p className="text-xs text-gray-500">6.5 mb • File</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className="bg-gray-200 rounded-md p-2">
                  <Globe className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    https://lunaroutpost.com
                  </p>
                  <p className="text-xs text-gray-500">External Link</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold text-green-700">
              About Lunar Outpost
            </h2>
            <p className="text-sm text-gray-600">
              Lunar Outpost is an advanced technology company with a focus on
              developing technologies that have both Earth and space
              applications. Lunar Outpost plans on filling an important role in
              the expanding space industry and is currently using its technical
              expertise to solve a variety of technological challenges.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold text-green-700">
              Resell options
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Resell Royalties</span>
                <span className="font-medium">5%</span>
              </div>
              <div className="flex justify-between">
                <span>Resale Restrictions</span>
                <span className="font-medium">Date: 20/12/2021 2:31 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};