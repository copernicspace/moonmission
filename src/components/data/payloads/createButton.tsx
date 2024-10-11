"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui"
import { CreateChildAssetFormComponent } from "@/components/forms/payloads/childAsset"

export default function CreateAssetButton() {
    const [isModalOpen, setModalOpen] = useState(false)

    // Function to handle opening/closing the modal
    const toggleModal = () => {
        setModalOpen((prev) => !prev)
    }

    return (
        <>
            {/* Create Asset Button */}
            <Card className="w-full px-3 sm:w-64 h-64 bg-gray-50 cursor-pointer" onClick={toggleModal}>
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
                            <h3 className="font-semibold text-lg mb-1">Create new child asset</h3>
                            <p className="text-sm text-gray-500">You have 2 assets left to create</p>
                        </div>
                    </Button>
                </CardContent>
            </Card>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={toggleModal} // Click outside the modal to close
                >
                    <div
                        className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        {/* Modal content */}
                        <CreateChildAssetFormComponent />
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={toggleModal} // Close button inside the modal
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}