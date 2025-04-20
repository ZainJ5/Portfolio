import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Zain Jamshaid - Software Engineer & Web Developer',
  description: 'Portfolio showcasing the projects and skills of Zain Jamshaid, a Software Engineering student and Web Developer specializing in Next.js and interactive web experiences.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}