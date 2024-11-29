import { Navbar } from "@/components/navbar"
import { AssetForm } from "@/components/asset-form"

export default function ViewAssetPage() {
  return (
    <div>
      <Navbar />
      <AssetForm readOnly />
    </div>
  )
}

