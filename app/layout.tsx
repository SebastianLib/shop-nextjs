import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shop Nextjs",
  description:
    "Shop Next.js is a cutting-edge e-commerce platform, crafted with create next app. Seamlessly add and purchase products in our user-friendly store. Powered by Next.js, our application ensures a swift and responsive shopping experience, coupled with efficient product management. Explore a wide range of offerings and enjoy the convenience of buying and selling with Shop Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
