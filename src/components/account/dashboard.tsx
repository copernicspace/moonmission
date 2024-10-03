"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Mail } from "lucide-react";
import ProfileCreateForm from "../forms/account/profileCreate";
import Image from "next/image";
import CreateAssetButton from "../data/payloads/createButton";

export default function AccountDashboard() {
    const supabase = useSupabaseClient();
    const session = useSession();

    const [activeAssetsTab, setActiveAssetsTab] = useState("assets");
    const [activeOffersTab, setActiveOffersTab] = useState("assets");

    const [fullName, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

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
            };

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
            };
        } catch (error) {
            console.log("Error fetching profile");
        } finally {
            setLoading(false);
        };
    }, [session, supabase]);

    useEffect(() => {
        getProfile();
    }, [session, getProfile]);

    if (fullName === null || username === null) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="py-16 sm:py-24">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                                    Copernic Spacemart
                                </h1>
                                <p className="text-xl text-gray-600">
                                    Create and sell your own space assets and spaceibles NFTs
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Explore Spacemart
                                </Button>
                            </div>
                            <div className="relative h-64 sm:h-80 md:h-96">
                                <Image
                                    src="/placeholder.svg?height=600&width=800"
                                    alt="Spacemart"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="container mx-auto px-4 py-8">
                            <Card className="mb-8">
                                <CardContent className="p-2">
                                    <ProfileCreateForm />
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </main>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="mr-4">
                                <Upload className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {fullName}
                                </h2>
                                <p className="text-sm text-gray-500">{username}</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                            <Button variant="outline" className="mb-2 sm:mb-8 sm:mr-2">
                                Edit Profile
                            </Button>
                            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>E-mail is verified</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Your Created Assets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <Tabs value={activeAssetsTab} onValueChange={setActiveAssetsTab}>
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
                        <p className="text-gray-500 mb-4">
                            You haven't created any assets yt
                        </p>
                        <Button>Create a child payload</Button>
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
                        <CreateAssetButton />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};