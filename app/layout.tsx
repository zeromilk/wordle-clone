import "@/styles/reset.css";
import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalProviders from "@/providers";
import RootContainer from "@/ui/container/RootContainer";
import { Toast } from "@/ui/feedback/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cloned wordle game",
  description: "Hello, Wordle game! Let's 하자 together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalProviders>
          <RootContainer>
            {children}
            <Toast />
          </RootContainer>
        </GlobalProviders>
      </body>
      <div id="portal-modal"></div>
    </html>
  );
}
