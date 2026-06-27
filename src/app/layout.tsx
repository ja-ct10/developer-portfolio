import type { Metadata, Viewport } from "next";
import { Pacifico, Poppins } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { SplashScreen } from "@/components/ui/SplashScreen";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julie Ann Tiron | Developer Portfolio",
  description:
    "Portfolio of Julie Ann Tiron — aspiring back-end developer, cybersecurity professional, and database administrator.",
  metadataBase: new URL("https://julieanntiron.dev"),
  openGraph: {
    title: "Julie Ann Tiron | Developer Portfolio",
    description:
      "Portfolio of Julie Ann Tiron — aspiring back-end developer, cybersecurity professional, and database administrator.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#E91E8C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pacifico.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden">
        <SplashScreen />
        <MotionProvider>
          {children}
          <GrainOverlay />
        </MotionProvider>
      </body>
    </html>
  );
}
