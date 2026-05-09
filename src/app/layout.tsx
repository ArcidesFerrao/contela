import type { Metadata } from "next";

import localFont from "next/font/local";

const sansationSans = localFont({
  src: [
    {
      path: "../utils/fonts/Sansation/Sansation-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../utils/fonts/Sansation/Sansation-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../utils/fonts/Sansation/Sansation-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../utils/fonts/Sansation/Sansation-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../utils/fonts/Sansation/Sansation-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../utils/fonts/Sansation/Sansation-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sansation-sans",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Contela",
  description: "Gestão empresarial para negócios moçambicanos",
  icons: {
    icon: [{ url: "/favicon.png" }],
  },
  openGraph: {
    title: "Contela",
    description: "Gestão empresarial para negócios moçambicanos",
    url: "https://contela.evolurelabs.com",
    locale: "pt_MZ",
    images: ["/evolure-langing.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Contela",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0" },
  description: "Plataforma de gestão para negócios moçambicanos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-MZ" className={`${sansationSans.variable}  antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
