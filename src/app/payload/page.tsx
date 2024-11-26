import Navbar from "@/components/navbar"
import { ImageCarousel } from "@/components/image-carousel"
import { FileCard } from "@/components/file-card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText, ImageIcon } from 'lucide-react'

const images = [
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Space satellite in orbit",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Astronauts on moon surface",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Sunrise from space",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Space station",
  },
]

export default function AssetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <ImageCarousel images={images} />
            <div>
              <h2 className="mb-3 text-xl font-semibold">Type</h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Space asset</Badge>
                <Badge variant="secondary">Space asset</Badge>
                <Badge variant="secondary">Satellite</Badge>
                <Badge variant="secondary">Space asset</Badge>
                <Badge variant="secondary">Space</Badge>
                <Badge variant="secondary">Space asset</Badge>
                <Badge variant="secondary">Imagery</Badge>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Child asset name</h1>
              <div className="mt-2 space-y-1 text-sm text-gray-500">
                <p>
                  Owned by:{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    User_name
                  </a>
                </p>
                <p>
                  Collection:{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Collection name
                  </a>
                </p>
                <p>
                  Based on:{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Root asset name
                  </a>
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              The Copernic Space Platform empowers you to become a stakeholder and player in the new space economy. The
              Copernic Space Platform empowers you to become a stakeholder and player in the new space economy new space
              economy. The Copernic
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Files & links</h2>
              <div className="grid gap-4">
                <FileCard name="File_for_upload.doc" size="6.5 mb" icon={<FileText className="h-6 w-6" />} type={""} />
                <FileCard name="File_for_upload.doc" size="6.5 mb" icon={<FileText className="h-6 w-6" />} type={""} />
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                    <ExternalLink className="h-6 w-6" />
                  </div>
                  <a href="https://x.com/CopernicSpace" className="flex-1 text-blue-600 hover:underline">
                    https://x.com/CopernicSpace
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Payload</h2>
              <div className="grid gap-4">
                <FileCard name="my-art-name.png" size="6.5 mb" icon={<ImageIcon className="h-6 w-6" />} type={""} />
                <FileCard
                                  name="If-Payload-is-not-an-image.doc"
                                  size="6.5 mb"
                                  icon={<FileText className="h-6 w-6" />} type={""}                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};