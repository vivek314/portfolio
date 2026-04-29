import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlatChef",
  description: "Agentic grocery procurement for Indian households",
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
