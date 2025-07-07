import { Roboto } from 'next/font/google';
import '../styles/main.scss';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const roboto = Roboto({
  subsets: ['latin', 'latin-ext'], // Czech language support
  weight: ['400', '500', '600', '700'], // Only weights that are actually used
  display: 'swap', // Better performance
  variable: '--font-roboto', // CSS variable for advanced usage
});

export const metadata = {
  title: "DIA - Digitální a informační agentura",
  description: "Platforma pro orgány veřejné moci - centrální dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <Header />
        <main id="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
