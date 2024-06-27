import React from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
	title: "Auth0 NextJS Embedded",
	description: "auth0-nextjs-embedded hook usage example",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
