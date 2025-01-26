import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ProviderContainer from "@/provider/ProviderContainer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <body className={`${poppins.className} bgSmooth`}>
        <ProviderContainer>{children}</ProviderContainer>
      </body>
    </html>
  );
}
