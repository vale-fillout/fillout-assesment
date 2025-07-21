import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Fillout Bottom",
	description: "A simple bottom sheet component for the Fillout app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${interSans.variable} antialiased`}>{children}</body>
		</html>
	);
}
