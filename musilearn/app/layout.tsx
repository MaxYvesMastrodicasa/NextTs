import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
import { Metadata } from "next";

export const metadata = {
  title: {
    template: "%s | MusiLearn",
    default: "MusiLearn - École de Musique",
  },
  description: "Plateforme de gestion de cours de musique",
  keywords: ["musique", "cours", "apprentissage"],
  authors: [{ name: "MusiLearn" }],
  openGraph: {
    images: "/images/og-image.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
