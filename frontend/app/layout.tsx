import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Đã sửa đường dẫn import để trỏ đến thư mục app
import "@/app/globals.css";

// 1. Import Providers
// Đã sửa đường dẫn import để trỏ đến thư mục app
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Ticket dApp",
  description: "dApp để đúc vé NFT trên Celo",
};

// 2. Gói (Wrap) 'children' bằng 'Providers'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

