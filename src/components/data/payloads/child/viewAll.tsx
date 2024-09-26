"use client";

import { useState, useEffect } from 'react'
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileIcon, ImageIcon, InfoIcon, PackageIcon } from "lucide-react"
import { ChildRecord } from 'types/payloads'

export function GalleryGridComponent() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [records, setRecords] = useState<ChildRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('childassets')
          .select('*')

        if (error) throw error
        if (data) {
          setRecords(data);
        };
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load assets');
      } finally {
        setLoading(false);
      };
    };

    fetchRecords();
  }, [supabase]);

  const filteredRecords = records.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Gallery</h1>
      <Input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {loading ? (
        <p>Loading assets...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{record.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="aspect-square bg-gray-200 mb-2 flex items-center justify-center">
                  {/* <ImageIcon className="w-12 h-12 text-gray-400" /> */}
                  <img
                    className='w-64 h-64 text-gray-400'
                    src={'http://127.0.0.1:54321/storage/v1/object/public/payload/' + record.thumbnail}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <PackageIcon className="w-4 h-4 mr-1" />
                  <span>{record.units}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FileIcon className="w-4 h-4 mr-1" />
                  <span>{record.mainFile}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <InfoIcon className="w-4 h-4 mr-1" />
                  Details
                </Button>
                <div className="text-sm text-gray-500">
                  ID: {record.id}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};