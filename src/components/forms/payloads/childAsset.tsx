"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

export default function CreateChildAssetForm() {
    const supabase = useSupabaseClient();
    const session = useSession();

    return (
        <>
            
        </>
    )
};