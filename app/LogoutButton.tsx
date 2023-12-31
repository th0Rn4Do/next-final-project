'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { getSafeReturnToPath } from '../util/validation';
import { logout } from './(auth)/logout/actions';
import styles from './LogoutButton.module.scss';

type Props = { returnTo?: string | string[] };

export function LogoutButton(props: Props) {
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.button}
        formAction={async () => {
          await logout();

          router.push(
            getSafeReturnToPath(props.returnTo) || (`/login` as Route),
          );
          router.refresh();
        }}
      >
        logout
      </button>
    </form>
  );
}
