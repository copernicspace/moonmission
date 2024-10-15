"use client";

import { FilterableGalleryGridComponent } from "@/components/data/payloads/child/Test_viewAll";
import React from "react";

export default function ChildAssetsView() {
    return (
        <div className="py-2">
            <FilterableGalleryGridComponent />
        </div>
    );
};