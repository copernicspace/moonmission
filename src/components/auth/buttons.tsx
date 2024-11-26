import React, { useState } from "react";
import { Button } from "../ui";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const SignOutButton: React.FC = () => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError("Failed to sign out. Please try again.");
      console.error("SignOut Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleSignOut}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Signing Out..." : "Sign Out"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};