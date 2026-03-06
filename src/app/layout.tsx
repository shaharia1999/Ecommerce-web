import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import QueryProvider from "../providers/QueryProvider";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { Suspense } from "react";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
  {/* Meta Pixel Code */}
  <meta name="facebook-domain-verification" content="ea3ppqi6k3qzzirknmf40fuh1p2ypb" />

  <Script
    id="facebook-pixel"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1912930496095765');
        fbq('track', 'PageView');
      `,
    }}
  />
  <noscript>
    <img
      height="1"
      width="1"
      style={{ display: 'none' }}
      src="https://www.facebook.com/tr?id=1912930496095765&ev=PageView&noscript=1"
    />
  </noscript>
  {/* End Meta Pixel Code */}
</head>
      <body className={`${inter.className} flex flex-col min-h-screen `}>
        
        <QueryProvider>
          <WishlistProvider>
            <CartProvider>
              {/* Sticky Navbar */}
              <Suspense >
                <Navbar className="sticky top-0 z-50 mx-auto" />
              </Suspense>

              {/* Main content fills available space */}
              <main className="flex-1 pt-4">{children}</main>
              {/* Footer always at bottom */}
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </QueryProvider>
      </body>
    </html>
  );
}



export const metadata: Metadata = {
  title: 'Easyshop-e-commerce | Best Online Shopping in Bangladesh',
  description: 'Explore the latest fashion, electronics, and daily essentials. Enjoy huge discounts on Flash Sales and discover our New Arrivals. Shop now at YourShop!',
  keywords: ['Easyshop-e-commerce', 'Online Shopping', 'Flash Sale', 'New Arrivals', 'Bangladesh Shop'],
  authors: [{ name: 'YourShop Team' }],
  openGraph: {
    title: 'Easyshop-e-commerce | Best Online Shopping in Bangladesh',
    description: 'Explore the latest fashion, electronics, and daily essentials with huge discounts.',
    url: 'https://easyshop-e-commarce.shop/', // Replace with your actual domain
    siteName: 'Easyshop-e-commerce',
    images: [
      {
        url: 'https://easyshop-e-commarce.shop/og-image.jpg', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Easyshop-e-commerce Home Page Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easyshop-e-commerce | Best Online Shopping in Bangladesh',
    description: 'Explore the latest fashion, electronics, and daily essentials with huge discounts.',
    images: ['https://easyshop-e-commarce.shop/twitter-image.jpg'], // Replace with your actual Twitter image path
  },
  robots: {
    index: true,
    follow: true,
  },
};
