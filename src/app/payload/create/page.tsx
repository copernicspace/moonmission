"use client";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import CreateChildAssetForm from "../../../components/forms/payloads/childAsset";

export default function CreateChildPayloadPage() {
    return (
        <div className="py-2">
            <DropdownMenu />
            <CreateChildAssetForm />
        </div>
    );
};