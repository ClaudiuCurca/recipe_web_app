import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Title to change",
  description: "Learning NextJS project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
