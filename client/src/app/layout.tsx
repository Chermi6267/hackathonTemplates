import type { Metadata } from "next";
import { Comfortaa, Pacifico } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";

const comfortaa = Comfortaa({
  subsets: ["cyrillic-ext", "cyrillic"],
  weight: "400",
  variable: "--comfortaa_font",
});

const pacifico = Pacifico({
  subsets: ["cyrillic-ext", "cyrillic"],
  weight: "400",
  variable: "--pacifico_font",
});

export const metadata: Metadata = {
  title: "IndustTourism",
  description: "Dirty deeds done dirty cheap!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body className={`${comfortaa.className} ${pacifico.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
