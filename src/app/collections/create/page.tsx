"use client";

import CreateNewCollection from "@/components/forms/collections";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export default function CreateCollectionPage() {
    return (
        <div className="py-2">
            <DropdownMenu />
            <CreateNewCollection />
        </div>
    );
};