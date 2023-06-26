'use client';

import { useRouter } from 'next/navigation';
import { logout } from './(auth)/logout/actions';
import styles from './LogoutButton.module.scss';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <div className={styles.backgroundlogoutbutton}>
      <button
        className={styles.logoutbutton}
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        logout
      </button>
      </div>
    </form>
  );
}
