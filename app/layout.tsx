import './globals.scss';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import { CookieBanner } from './CookieBanner';
import styles from './layout.module.scss';
import { LogoutButton } from './LogoutButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'FindAmusician Next App | FindAmusician',
    template: '%s | FindAmusician Next App',
  },
  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>
          <div className={styles.navbarorientation}>
            <nav className={styles.navigationbar}>
              <div className={styles.navigationbarleftside}>
                <div className={styles.hyperlinks}>
                  <Link href="/">Home</Link>
                </div>
                <div className={styles.navbarspace} />
              </div>
              <div className={styles.navigationbarrightside}>
                <div className={styles.hyperlinks}>
                  <Link href="/search">Search</Link>
                </div>
                {user ? (
                  <>
                    <div className={styles.usershowinginnavbar}>
                      {user.username}
                    </div>
                    <div className={styles.logoutbutton}>
                      <LogoutButton />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.registrationbutton}>
                      <Link href="/register">register</Link>
                    </div>
                    <div className={styles.loginbutton}>
                      <Link href="/login">login</Link>
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>
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
