"use client";

import React, { useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Button, Input, Textarea, Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CreateChildAssetForm() {
    const supabase = useSupabaseClient();
    const session = useSession();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mainMedia: null as File | null,
        mainFile: null as File | null,
        units: '',
        collection_id: null as number | null,
        parent_payload_id: null as number | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
        const { value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                [field]: files ? files[0] : null,
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
        let thumbnailUrl = '';
        let mainFileUrl = '';

        const generateUniqueFileName = (fileName: string) => {
            const timestamp = Date.now();
            const extension = fileName.split('.').pop();
            const nameWithoutExtension = fileName.replace(`.${extension}`, '');
            return `${nameWithoutExtension}_${timestamp}.${extension}`;
        };

        if (formData.mainMedia) {
            const uniqueMediaName = generateUniqueFileName(formData.mainMedia.name);
            const { data: mediaData, error: mediaError } = await supabase.storage
                .from('payload')
                .upload(`moonMission/child/${formData.title}/${uniqueMediaName}`, formData.mainMedia);
            if (mediaError) {
                console.error("Error uploading main media: ", mediaError.message);
                alert("Error uploading main media: " + mediaError.message);
                return;
            };
            thumbnailUrl = mediaData.path;
        };

        if (formData.mainFile) {
            const uniqueFileName = generateUniqueFileName(formData.mainFile.name);
            const { data: fileData, error: fileError } = await supabase.storage
                .from('payload')
                .upload(`moonMission/child/${formData.title}/${uniqueFileName}`, formData.mainFile);
            if (fileError) {
                console.error("Error uploading main file: ", fileError.message);
                alert("Error uploading main file: " + fileError.message);
                return;
            };
            mainFileUrl = fileData.path;
        };

        const { error: insertError } = await supabase
            .from("childassets")
            .insert({
                title: formData.title,
                description: formData.description,
                thumbnail: thumbnailUrl,
                mainmedia: thumbnailUrl,  // Assuming main media refers to the same as thumbnail
                mainfile: mainFileUrl,
                units: formData.units,
                collection_id: formData.collection_id,
                parent_payload_id: formData.parent_payload_id,
            });

        if (insertError) {
            console.error("Error inserting child asset: ", insertError.message);
            alert("Failed to create child asset: " + insertError.message);
            return;
        };

        alert("Child asset created successfully!");
    };

    // UI elements
    const [step, setStep] = useState(0);
    const formSteps = [
        { title: 'Title', component: <Input type="text" placeholder="Title" value={formData.title} onChange={(e) => handleChange(e, 'title')} required /> },
        { title: 'Description', component: <Textarea placeholder="Description" value={formData.description} onChange={(e) => handleTextareaChange(e, 'description')} required /> },
        { title: 'Main Media', component: <Input type="file" onChange={(e) => handleChange(e, 'mainMedia')} required /> },
        { title: 'Units', component: <Input type="text" placeholder="Units" value={formData.units} onChange={(e) => handleChange(e, 'units')} required /> },
        { title: 'Collection ID', component: <Input type="number" placeholder="Collection ID" value={formData.collection_id || ''} onChange={(e) => handleChange(e, 'collection_id')} /> },
        { title: 'Parent Payload ID', component: <Input type="number" placeholder="Parent Payload ID" value={formData.parent_payload_id || ''} onChange={(e) => handleChange(e, 'parent_payload_id')} required /> },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Create Child Asset (for Moon Mission)
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
                            onClick={() => setStep(prev => Math.max(0, prev - 1))}
                            disabled={step === 0}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        {step === formSteps.length - 1 ? (
                            <Button type="submit">Create Child Asset</Button>
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