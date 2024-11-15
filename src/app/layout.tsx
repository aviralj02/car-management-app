import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthUserProvider } from "@/context/AuthUserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manage Cars",
  description: "A Simple CRUD using REST Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen grid grid-rows-[auto_1fr_auto]`}
      >
        <AuthUserProvider>
          <Header />

          {children}

          <Footer />
        </AuthUserProvider>
        <Toaster />
      </body>
    </html>
  );
}
