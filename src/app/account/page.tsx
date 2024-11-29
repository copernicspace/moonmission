import { UnregisteredAssetGrid } from "@/components/allocation";
import { AssetGrid } from "@/components/asset-grid";
import Navbar from "@/components/navbar";
import { ProfileHeader } from "@/components/profile-header";

export default function ProfilePage() {
  return (
    <main>
      {/* <Navbar /> */}
      <ProfileHeader />
      <AssetGrid />
      <UnregisteredAssetGrid />
    </main>
  );
};