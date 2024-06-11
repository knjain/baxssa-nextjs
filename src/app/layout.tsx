import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Admin Dashboard",
  description: "Next.js Tutorial",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
