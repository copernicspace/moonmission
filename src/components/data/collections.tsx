'use client';

import { useState, useEffect } from 'react'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InfoIcon, PackageIcon } from "lucide-react"

interface Collection {
  id: number
  name: string | null
  description: string | null
  owner_id: string
  created_at: string
  cover_image: string | null;
};

export function CollectionsGridComponent() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('collections')
          .select('*');

        if (error) throw error;
        if (data) {
          setCollections(data);
        };
      } catch (error) {
        console.error('Error fetching collections:', error);
        setError('Failed to load collections');
      } finally {
        setLoading(false);
      };
    };

    fetchCollections();
  }, [supabase]);

  const filteredCollections = collections.filter(collection =>
    (collection.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (collection.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Collections Gallery</h1>
      <Input
        type="text"
        placeholder="Search collections..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {loading ? (
        <p>Loading collections...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCollections.map((collection) => (
            <Card key={collection.id} className="flex flex-col">
  <CardHeader>
    <CardTitle className="text-lg">{collection.name || 'Untitled Collection'}</CardTitle>
  </CardHeader>
  <CardContent className="flex-grow">
    {collection.cover_image ? (
      <img
        src={collection.cover_image}
        alt={`${collection.name} cover`}
        className="w-full h-40 object-cover mb-2"
      />
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-2">
        <span className="text-sm text-gray-500">No cover image</span>
      </div>
    )}
    <p className="text-sm text-gray-600 mb-2">{collection.description || 'No description available'}</p>
    <div className="flex items-center text-sm text-gray-500 mb-1">
      <PackageIcon className="w-4 h-4 mr-1" />
      <span>Owner ID: {collection.owner_id}</span>
    </div>
    <div className="text-sm text-gray-500">
      Created: {new Date(collection.created_at).toLocaleDateString()}
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline" size="sm">
      <InfoIcon className="w-4 h-4 mr-1" />
      Details
    </Button>
    <div className="text-sm text-gray-500">
      ID: {collection.id}
    </div>
  </CardFooter>
</Card>

          ))}
        </div>
      )}
    </div>
  );
};