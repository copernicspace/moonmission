"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Mail, LogOut } from "lucide-react";
import ProfileCreateForm from "../forms/account/profileCreate";
import Image from "next/image";
import CreateAssetButton from "../data/payloads/createButton";
import { ParentPayloadsGridComponent } from "../data/payloads/parent/list";
import { ChildAssetsGridComponent } from "../data/payloads/child/list";

export default function AccountDashboard() { 
    const supabase = useSupabaseClient();
    const session = useSession();

    const [activeAssetsTab, setActiveAssetsTab] = useState("assets");
    const [activeOffersTab, setActiveOffersTab] = useState("assets");

    const [fullName, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

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
            console.log("Error fetching profile");
        } finally {
            setLoading(false);
        }
    }, [session, supabase]);

    useEffect(() => {
        if (session) {
            getProfile();
        }
    }, [session, getProfile]);

    if (loading) {
        return <div>Loading profile...</div>;
    };

    if (!fullName) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0aec0' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3C/g%3E%3C/svg%3E\")"
            }}>
                <section className="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                    <ProfileCreateForm />
                </section>
        
                <div className="container mx-auto px-4 py-8">
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Your Created Assets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Tabs value={activeAssetsTab} onValueChange={setActiveAssetsTab}>
                                    <TabsList>
                                        <TabsTrigger value="assets">Assets</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 mb-4">You haven't created any assets yet</p>
                                <Button>Create a child payload</Button>
                                <ChildAssetsGridComponent /> {/* Test - need to add profile foreign key */}
                            </div>
                        </CardContent>
                    </Card>
        
                    <Card>
                        <CardHeader>
                            <CardTitle>Available to create</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <Tabs value={activeOffersTab} onValueChange={setActiveOffersTab}>
                                    <TabsList>
                                        <TabsTrigger value="assets">Assets</TabsTrigger>
                                        <TabsTrigger value="licenses">Licenses</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="oldest">Oldest</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-500 mb-4">You have no offers available</p>
                                <CreateAssetButton />
                                <CreateAssetButton />
                                {/* <Upload className="mr-2 h-4 w-4" /> */}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a0aec0' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3C/g%3E%3C/svg%3E\")"
        }}>
            {/* Top section with profile and navigation */}
            <section className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={avatarUrl || "/placeholder.svg?height=100&width=100"}
                        alt={`${fullName}'s profile picture`}
                        className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
                    />
                    <div className="flex-grow text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
                        <p className="text-blue-600">@{username}</p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-3">
                        {["Dashboard", "Messages", "Settings"].map((text) => (
                            <Button
                                key={text}
                                className="bg-gradient-to-b from-white to-gray-100 text-blue-600 border border-gray-300 shadow-sm hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
                            >
                                {text}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-200">
                    <Button
                        variant="destructive"
                        className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md transition-all duration-200"
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
            </section>
    
            {/* Main content section */}
            <div className="container mx-auto px-4 py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Your Created Assets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <Tabs value={activeAssetsTab} onValueChange={setActiveAssetsTab}>
                                <TabsList>
                                    <TabsTrigger value="assets">Assets</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            {/* <p className="text-gray-500 mb-4">You haven't created any assets yet</p>
                            <Button>Create a child payload</Button> */}
                            <ChildAssetsGridComponent />
                        </div>
                    </CardContent>
                </Card>
    
                <Card>
                    <CardHeader>
                        <CardTitle>Available to create</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-4">
                            <Tabs value={activeOffersTab} onValueChange={setActiveOffersTab}>
                                <TabsList>
                                    <TabsTrigger value="assets">Assets</TabsTrigger>
                                    <TabsTrigger value="licenses">Licenses</TabsTrigger>
                                    <TabsTrigger value="licenses">Spacibles</TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-center py-12 flex flex-row bg-gray-50 rounded-lg">
                            <div className="px-2">
                                <CreateAssetButton />
                            </div>
                            <div className="px-2">
                                <CreateAssetButton />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="container mx-auto px-4 py-4">
                <Card>
                    <CardHeader>
                        All your assets
                    </CardHeader>
                    <CardContent>
                        <div className="flex text-center py-4 flex-row bg-gray-100 rounded-lg">
                            <ChildAssetsGridComponent />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="container mx-auto px-4 py-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming missions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex text-center py-4 flex-row bg-gray-50 rounded-lg">
                            <ParentPayloadsGridComponent />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
    
};