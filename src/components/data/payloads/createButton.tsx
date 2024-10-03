"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui";

export default function CreateAssetButton() {
    return (
        <Card className="w-full sm:w-64 h-64 bg-gray-50 cursor-pointer">
            <CardContent className="p-0 h-full">
                <Button
                    variant="ghost"
                    className="w-full h-full flex flex-col items-center justify-center space-y-4 rounded-none"
                >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-lg mb-1">
                            Create new child asset
                        </h3>
                        <p className="text-sm text-gray-500">
                            You have 2 assets left to crreate
                        </p>
                    </div>
                </Button>
            </CardContent>
        </Card>
    );
};