import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "TheBadReview",
	description:
		"Fun multiplayer game where players have to guess from a bad or fun review which movie it is about.",
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{
				url: "/favicon_io/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png"
			},
			{
				url: "/favicon_io/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png"
			}
		],
		apple: [{ url: "/favicon_io/apple-touch-icon.png" }],
		other: [
			{
				url: "/favicon_io/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png"
			},
			{
				url: "/favicon_io/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png"
			}
		]
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Header />
				<div className="fixed inset-0 -z-10 bg-[#C21212]" />
				{children}
				<Footer />
			</body>
		</html>
	);
}
