import type { Metadata } from "next";
import "../style/globals.css";
import { siteConfig } from "../config/site";
import { fontPoppin } from "../config/fonts";
import clsx from "clsx";
import { Nextui_Providers } from "../componets/nextui_providers";
import Redux_Provider from "../componets/redux_providers";


export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/login-page-image/logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={clsx(fontPoppin.className)} >
				<Redux_Provider>
						<Nextui_Providers>
							{children}
						</Nextui_Providers>
				</Redux_Provider>
			</body>
		</html>
	);
}
