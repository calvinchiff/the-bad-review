import type { Metadata } from "next";
import { Jersey_25 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const jersey = Jersey_25({
	variable: "--font-jersey-25",
	subsets: ["latin"],
	weight: "400"
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
				className={`${jersey.variable} min-h-screen font-jersey-25 antialiased flex flex-col overflow-hidden`}
			>
				<Header />
				<div className="fixed inset-0 -z-10 bg-[#C21212]" />
				<main className="flex-1 flex flex-col justify-center items-center font-jersey-25 overflow-auto h-full">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
