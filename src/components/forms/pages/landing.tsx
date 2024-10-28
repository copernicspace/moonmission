"use client";

import Image from "next/image";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";

export default function LandingPageComponent() {
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
                </section>
                <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative h-64 sm:h-90 md:h-96">
                            <Image
                                src="/placeholder.svg?height=600&width=800"
                                alt="Spaceibles"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                                Spacibles
                            </h2>
                            <p className="text-xl text-gray-600">
                                Discover unique digital space collectibles and assets
                            </p>
                            <Button
                                size="lg"
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Explore Spaceibles
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
                        Instructions
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Connect your wallet", description: "Use one of the available wallets to connect to the app securely." },
                            { title: "Create your Space Asset", description: "Choose Space Mart Asset or Spaceible Asset and set up your digital space item." },
                            { title: "Sell your Space Asset", description: "List your asset for sale or create an auction for potential buyers." }
                        ].map((step, index) => (
                            <div key={index} className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Experience Zero Fees
                        </h2>
                        <p className="text-xl text-gray-600">
                            Test our platform by creating, selling and purchasing multiple assets without paying commissions. Use Mock tokens for transaction fees.
                        </p>
                        <Button
                            size="lg"
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Try Sandbox Mode
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    )
}