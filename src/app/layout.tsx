import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivek Gunnabattula — Backend Engineer & System Design",
  description:
    "Software Developer 2 at Oracle | AI Graduate from IIT Hyderabad. Specializing in distributed systems, event-driven architecture, and scalable backend solutions.",
  metadataBase: new URL("https://heyvivek.in"),
  openGraph: {
    title: "Vivek Gunnabattula — Backend Engineer & System Design",
    description:
      "Software Developer at Oracle with expertise in distributed systems, event-driven architecture, and scalable backend solutions. AI graduate from IIT Hyderabad.",
    url: "https://heyvivek.in",
    siteName: "heyvivek.in",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Gunnabattula — Backend Engineer",
    description:
      "Backend Engineer at Oracle | IIT Hyderabad | System Design Enthusiast | Distributed Systems",
  },
  keywords: [
    "Vivek Gunnabattula",
    "Backend Engineer",
    "System Design",
    "Distributed Systems",
    "Java",
    "Spring Boot",
    "Kafka",
    "Oracle",
    "IIT Hyderabad",
    "Portfolio",
  ],
  authors: [{ name: "Vivek Gunnabattula" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSerifDisplay.variable} ${outfit.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
