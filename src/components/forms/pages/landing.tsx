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

            {/* <footer className="bg-gradient-to-b from-gray-50 to-white py-12">
                <div className="container mx-auto px-4 sm:px-7 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                About Us
                            </h3>
                            <p className="text-gray-600">
                                Copernic Space is revolutionizing the way we interact with digital space assets and collectibles.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Quick links
                            </h3>
                            <ul className="space-y-2">
                                {["Home", "Spacemart", "Spacibles", "FAQ", "Contact"].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Stay connected
                            </h3>
                            <p className="text-gray-600">Subscribe to our newsletter for the latest updates & offers. </p>
                            <form className="flex space-x-2">
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-48"
                                />
                                <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Subscribe
                                </Button>
                            </form>
                            <div className="flex space-x-4">
                                {["Twitter", "Discord", "LinkedIn"].map((social) => (
                                    <a key={social} href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <span className="sr-only">{social}</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-gray-600">&copy; 2024 Copernic Space. All rights reserved.</p>
                    </div>
                </div>
            </footer> */}
        </div>
    )
}