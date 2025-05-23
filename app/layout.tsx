import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: "Belogoo App",
  description: "Generated by Belogoo",
  icons: {
    icon: [
      {
        url: "/favicon/b.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/blog.ico",
      },
    ],
  },
  openGraph: {
    title: "Welcome to Blogoo",
    description:
      "Unlock your full potential with expert-led insights and tips. Explore new skills and elevate your knowledge, one blog at a time.",
    url: process.env.NEXT_PUBLIC_URL,
    images: [
      {
        url: "/favicon/freepik__the-style-is-candid-image-photography-with-natural__70521.png",
        secureUrl:
          "/favicon/freepik__the-style-is-candid-image-photography-with-natural__70521.png",
        width: 1200,
        height: 630,
        alt: "blogoo preview",
      },
    ],
    type: "website",
    siteName: process.env.NEXT_PUBLIC_URL, //name should be like www.kkk.com
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-white dark:bg-slate-950 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="pt-20 px-5 md:container md:mx-auto">{children}</div>
      </body>
    </html>
  );
}
