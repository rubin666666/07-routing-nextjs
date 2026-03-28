import type { Metadata } from "next";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "Notes app with App Router, parallel routes, and modal previews.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          {modal}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
