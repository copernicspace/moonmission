"use client";

import { useCallback, useEffect, useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProfileCreateForm() {
    const supabase = useSupabaseClient();
    const session = useSession();

    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error, status } = await supabase
                .from("profiles")
                .select("full_name, username, avatar_url")
                .eq("id", session?.user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            // alert("Error fetching profile");
        } finally {
            setLoading(false);
        }
    }, [session, supabase]);

    useEffect(() => {
        getProfile();
    }, [session, getProfile]);

    async function updateProfile() {
        try {
            setLoading(true);
            const { error } = await supabase
                .from("profiles")
                .upsert({
                    id: session?.user.id,
                    full_name: fullname,
                    username,
                    avatar_url,
                    updated_at: new Date().toISOString(),
                });

            if (error) {
                throw error;
            }

            alert("Profile updated successfully!");
        } catch (error) {
            alert("Error updating profile");
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const { value } = e.target;
        if (field === 'username') setUsername(value);
        else if (field === 'fullname') setFullname(value);
        else if (field === 'avatar_url') setAvatarUrl(value);
    };

    // Multi-step form
    const formSteps = [
        {
            title: "Full Name",
            component: (
                <Input
                    type="text"
                    placeholder="Full Name"
                    value={fullname || ''}
                    onChange={(e) => handleChange(e, "fullname")}
                    required
                />
            ),
        },
        {
            title: "Username",
            component: (
                <Input
                    type="text"
                    placeholder="Username"
                    value={username || ''}
                    onChange={(e) => handleChange(e, "username")}
                    required
                />
            ),
        },
        {
            title: "Avatar URL",
            component: (
                <Input
                    type="text"
                    placeholder="Avatar URL"
                    value={avatar_url || ''}
                    onChange={(e) => handleChange(e, "avatar_url")}
                />
            ),
        },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <form onSubmit={(e) => { e.preventDefault(); updateProfile(); }}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Update Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">{formSteps[step].title}</h3>
                            {formSteps[step].component}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
                            disabled={step === 0}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        {step === formSteps.length - 1 ? (
                            <Button type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Update Profile"}
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={() => setStep((prev) => Math.min(formSteps.length - 1, prev + 1))}
                            >
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};