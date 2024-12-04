import Navbar from "@/components/navbar"
import { CollectionForm } from "@/components/collection-form"

export default function ViewCollectionPage() {
  return (
    <div>
      <Navbar />
      <CollectionForm readOnly />
    </div>
  )
}

