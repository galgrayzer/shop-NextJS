import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./(componnents)/Navbar";

export const metadata: Metadata = {
  title: "Gal's Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar
          links={[
            { href: "/", label: "Home" },
          ]} />
        {children}
      </body>
    </html>
  );
}
