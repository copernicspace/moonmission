"use client";

import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "@/components/auth/auth-form";

export default function Auth() {
    const session = useSession();
    
    if (!session) {
        return (
        <div className="flex">
            <LoginPage />
        </div>
        );
    };
    
    return (
        <div className="flex">
            <p>{session?.user?.id}</p>
        </div>
    );
};