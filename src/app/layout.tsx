import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import ProviderContainer from "@/provider/ProviderContainer";

const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "On The Go",
  description: "Travel Social Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/public/Icon.png" sizes="any" />
      <body className={`${quickSand.className} bgSmooth`}>
        <ProviderContainer>{children}</ProviderContainer>
      </body>
    </html>
  );
}
