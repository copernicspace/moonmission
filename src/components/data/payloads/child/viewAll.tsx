"use client"

import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoIcon, PackageIcon } from "lucide-react"

interface ChildRecord {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  collections?: { name: string };
  parentpayloads?: { title: string };
}

export function FilterableGalleryGridComponent() {
  const supabase = useSupabaseClient();

  const [records, setRecords] = useState<ChildRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<ChildRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedParentPayload, setSelectedParentPayload] = useState('');

  const [collections, setCollections] = useState<string[]>([]);
  const [parentPayloads, setParentPayloads] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('childassets')
          .select(`
            *,
            collections(name),
            parentpayloads(title)
          `)

        if (error) throw error
        if (data) {
          setRecords(data);
          setFilteredRecords(data);
          
        // Use Array.from() to convert Set to an array before iterating
        const uniqueCollections = Array.from(
          new Set(data.map(record => record.collections?.name).filter(Boolean))
        );

        const uniqueParentPayloads = Array.from(
          new Set(data.map(record => record.parentpayloads?.title).filter(Boolean))
        );
          
          setCollections(uniqueCollections);
          setParentPayloads(uniqueParentPayloads);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load assets');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [supabase]);

  useEffect(() => {
    const filtered = records.filter(record =>
      (record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       record.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCollection === 'all' || record.collections?.name === selectedCollection) &&   
      (selectedParentPayload === 'all' || record.parentpayloads?.title === selectedParentPayload)   
    );
    setFilteredRecords(filtered);
  }, [searchTerm, selectedCollection, selectedParentPayload, records]);  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asset Gallery</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedCollection} onValueChange={setSelectedCollection}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Collection" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Collections</SelectItem>
            {collections.map((collection) => (
              <SelectItem key={collection} value={collection}>{collection}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedParentPayload} onValueChange={setSelectedParentPayload}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Parent Payload" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parent Payloads</SelectItem>
            {parentPayloads.map((payload) => (
              <SelectItem key={payload} value={payload}>{payload}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && <p>Loading assets...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{record.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{record.description}</p>
                {record.thumbnail && (
                  <img
                    className="w-full h-auto mt-2"
                    src={supabase.storage.from('payload').getPublicUrl(record.thumbnail).data.publicUrl}
                    alt={record.title}
                  />
                )}
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Collection: {record.collections?.name || 'N/A'}</p>
                  <p>Parent Payload: {record.parentpayloads?.title || 'N/A'}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <InfoIcon className="mr-2 h-4 w-4" /> Details
                </Button>
                <Button variant="default">
                  <PackageIcon className="mr-2 h-4 w-4" /> Acquire
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};