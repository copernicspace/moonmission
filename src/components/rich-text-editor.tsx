"use client"

import { Bold, Italic, Quote, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Code, LinkIcon, ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
};

export function RichTextEditor({ value, onChange, readOnly = false }: RichTextEditorProps) {
  return (
    <div className="border rounded-md">
      {!readOnly && (
        <div className="flex items-center gap-0.5 border-b p-2">
          <Button variant="ghost" size="sm">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Quote className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm">
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <AlignRight className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="sm">
            <Code className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 focus-visible:ring-0 resize-none"
        placeholder="Enter description..."
        readOnly={readOnly}
      />
    </div>
  );
}