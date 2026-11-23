import "./globals.css";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "Zain Jamshaid — Software Engineer";
const description =
  "Associate Software Engineer at Ubiquify Digital. Full-stack products, CI/CD pipelines and LLM systems, built and shipped end to end.";

export const metadata = {
  metadataBase: new URL("https://zainjamshaid.vercel.app"),
  title,
  description,
  authors: [{ name: "Zain Jamshaid" }],
  openGraph: { title, description, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  themeColor: "#0c0b0a",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <body className="bg-ink text-bone">{children}</body>
    </html>
  );
}
