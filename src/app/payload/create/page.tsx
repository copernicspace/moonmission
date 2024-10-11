"use client";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { CreateChildAssetFormComponent } from "@/components/forms/payloads/childAsset";

export default function CreateChildPayloadPage() {
    return (
        <div className="py-2">
            <CreateChildAssetFormComponent />
        </div>
    );
};