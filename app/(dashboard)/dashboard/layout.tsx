import NetworkToast from "@/app/components/NetworkToast";
import "../../globals.css";

import MainLayout from "../components/MainLayout";
import Providers from "@/app/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>
        <MainLayout>{children}</MainLayout>
      </Providers>
    </>
  );
}
