import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/styles/globals.css";
import Navbar from "../components/Navbar";
import SessionProvider from "../components/SessionProvider";
import { auth } from "../lib/auth";
import { Toaster } from "../components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WriteIt",
  description: "A notetaking app with modern features.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    
    <html lang="en">

       
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <SessionProvider session={session}>

        
        <Navbar />
        <div className="">
      <main className="">
          {children}
          <Toaster />
        </main>
        </div>
        </SessionProvider>
        
      </body>

      
    </html>
  );
}
