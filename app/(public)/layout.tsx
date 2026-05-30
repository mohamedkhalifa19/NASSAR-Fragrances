import "../globals.css";

import { Toaster } from "@/components/ui/sonner";
import { FaWhatsapp } from "react-icons/fa";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const WHATSAPPNUMBER = process.env.NEXT_PUBLIC_WHATSAPPNUMBER;

  return (
    <>
      <Providers>
        {" "}
        <Navbar />
        {children}
        <a
          href={`https://wa.me/${WHATSAPPNUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 w-fit z-10 right-3 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center animate-bounce"
        >
          {/* WhatsApp Icon */}
          <FaWhatsapp className="text-2xl" />
        </a>
        <Footer />
        <Toaster />
      </Providers>
    </>
  );
}
