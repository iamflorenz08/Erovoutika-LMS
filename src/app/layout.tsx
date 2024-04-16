import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";
import "swiper/css";
import "swiper/css/navigation";
import DailyLoginReward from "@/components/dailyLoginReward";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ero Hub",
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <DailyLoginReward />
          {children}
        </Providers>
      </body>
    </html>
  );
}
