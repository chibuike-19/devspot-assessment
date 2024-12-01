"use client"

import { Inter, Roboto } from 'next/font/google'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Logo from "../public/logo.png"
import Image from 'next/image';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })
const roboto = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() =>{
    // setupDatabase();
  },[])
  return (
    <html lang="en" className="dark">
      <body className={roboto.className}>
        <nav className="bg-[#1B1B22] py-5 px-4 border-b border-b-[#424248]">
          <Image src={Logo} width={114} height={10} alt="Devspot Logo" />
        </nav>
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

