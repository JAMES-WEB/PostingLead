import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BernamaBiz Clone",
  description: "BernamaBiz Clone with Lead Capture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
