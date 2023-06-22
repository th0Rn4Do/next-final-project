import './globals.scss';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { CookieBanner } from './CookieBanner';
import styles from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'FindAmusician Next App | FindAmusician',
    template: '%s | FindAmusician Next App',
  },
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>
          <nav className={styles.navigationbar}>
            <div className={styles.hyperlinks}>
              <Link href="/">Home</Link>
            </div>
            <div className={styles.hyperlinks}>
              <Link href="/search">Search</Link>
            </div>
          </nav>
          <section className={styles.bodystylings}></section>
          <CookieBanner />
          {children}
        </div>
        <footer>
          <nav className={styles.footerbar}>
            <div className={styles.hyperlinks}>
              <Link href="/faqs">FAQs</Link>
            </div>
            <div className={styles.hyperlinks}>
              <Link href="/sitenotice">Site notice</Link>
            </div>
            <div className={styles.hyperlinks}>
              <Link href="/contactus">Contact us</Link>
            </div>
          </nav>
          <div className={styles.copyright}>Copyright 2023</div>
        </footer>
      </body>
    </html>
  );
}
