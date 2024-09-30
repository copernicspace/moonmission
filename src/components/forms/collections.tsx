"use client";

import React, { useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Button, Input, Textarea, Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CreateNewCollection() {
    const supabase = useSupabaseClient();
    const session = useSession();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        cover_image: null as File | null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof typeof formData
    ) => {
        const {
            value,
            type,
            files
        } = e.target;
        
        if (
            type === 'file'
        ) {
            setFormData(prevData => ({
                ...prevData,
                [field]: files ? files[0] : null
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [field]: value,
            }));
        };
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof typeof formData) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: e.target.value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        let coverImageUrl = '';
    
        const generateUniqueFileName = (fileName: string) => {
            const timestamp = Date.now();
            const extension = fileName.split('.').pop();
            const nameWithoutExtension = fileName.replace(`.${extension}`, '');
            return `${nameWithoutExtension}_${timestamp}.${extension}`;
        };

        if (formData.cover_image) {
            const uniqueMediaName = generateUniqueFileName(formData.cover_image.name);
            const { data: mediaData, error: mediaError } = await supabase.storage
                .from("payload")
                .upload(`moonMission/collection/${formData.name}/${uniqueMediaName}`, formData.cover_image);
    
            if (mediaError) {
                console.error("Error uploading cover image: ", mediaError.message);
                alert("Error uploading cover image: " + mediaError.message);
                return;
            }

            const { data: urlData } = supabase.storage
                .from("payload")
                .getPublicUrl(`moonMission/collection/${formData.name}/${uniqueMediaName}`);
            
            coverImageUrl = urlData?.publicUrl || '';
        }

        const { error: insertError } = await supabase
            .from("collections")
            .insert({
                name: formData.name,
                description: formData.description,
                cover_image: coverImageUrl,
                creator: session?.user.id,
            });
    
        if (insertError) {
            console.error("Error inserting collection: ", insertError.message);
            alert("Error inserting collection: " + insertError.message);
            return;
        }
    
        alert("Collection created successfully!");
    };
    
    // UI elements
    const [step, setStep] = useState(0);
    const formSteps = [
        {
            title: "Name",
            component: <Input type="text" placeholder="Title" value={formData.name} onChange={(e) => handleChange(e, 'name')} required />,
        },
        {
            title: "Description",
            component: <Textarea placeholder="Description" value={formData.description} onChange={(e) => handleTextareaChange(e, 'description')} required />,
        },
        {
            title: "Cover Image",
            component: <Input type="file" onChange={(e) => handleChange(e, 'cover_image')} required />,
        }
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle className="rtext-2xl font-bold text-center">
                                Create New Collection
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">
                                    {formSteps[step].title}
                                </h3>
                                {formSteps[step].component}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep(prev => Math.max(0, prev - 1))}
                                disabled={step === 0}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                            </Button>
                            {step === formSteps.length - 1 ? (
                                <Button type="submit">
                                    Create collection
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={() => setStep(prev => Math.min(formSteps.length - 1, prev + 1))}
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