import type { Metadata } from "next";
import "./globals.css";
import { Almarai, Cairo, Reem_Kufi, Tajawal } from "next/font/google";
import NetworkToast from "./components/NetworkToast";
import { Toaster } from "@/components/ui/sonner";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});
const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
});
const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem-kufi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nassar Perfumes",
  icons: { icon: "/images/logo.png" },
  description:
    "Nassar Perfumes is a fragrance store offering high-quality, long-lasting perfumes inspired by classic and modern scents. It provides a wide range of fragrances for every style and occasion, helping you find your signature scent at an affordable price.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} ${almarai.variable} ${reemKufi.variable}`}
    >
      <body className="min-h-full flex flex-col ">
        {children} <NetworkToast />
        <Toaster />
      </body>
    </html>
  );
}
