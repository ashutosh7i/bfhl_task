import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: '0827CI211004',
  description: 'Frontend application for data processing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
