"use client";

import ProfileCreateForm from "@/components/forms/account/profileCreate";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import React from "react";

export default function ProfilePage() {
    return (
        <div className="py-2">
            <DropdownMenu />
            <ProfileCreateForm />
        </div>
    );
};