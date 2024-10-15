"use client";

import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type ParentPayload = {
  title: string
  thumbnail: string
  description: string
  royalties: string
  location: string | null
  status: string | null
};

export function ParentPayloadsGridComponent() {
    const supabase = useSupabaseClient()

  const [payloads, setPayloads] = useState<ParentPayload[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPayloads() {
      const { data, error } = await supabase
        .from("parentpayloads")
        .select("title, thumbnail, description, royalties, location, status")

      if (error) {
        console.error("Error fetching payloads:", error)
      } else {
        setPayloads(data || [])
      };
      setLoading(false)
    };

    fetchPayloads()
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
      {payloads.map((payload, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative pb-[100%]">
            <img
              src={payload.thumbnail}
              alt={payload.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2 truncate">{payload.title}</h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{payload.description}</p>
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="text-xs">
                {parseFloat(payload.royalties).toFixed(2)}% Royalties
              </Badge>
              {(payload.location || payload.status) && (
                <Badge variant="outline" className="text-xs">
                  {payload.location && payload.status
                    ? `${payload.location} • ${payload.status}`
                    : payload.location || payload.status}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};