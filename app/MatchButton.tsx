'use client';

import { useRouter } from 'next/navigation';
import styles from './MatchButton.module.scss';

type Props = { returnTo?: string | string[] };

export function MatchButton(props: Props) {
  const router = useRouter();
  return (
    <form>
      <div className={styles.backgroundmatchbutton}>
        <button
          className={styles.matchbutton}
          formAction={async () => {
            await router.refresh();
          }}
        >
          Match
        </button>
      </div>
    </form>
  );
}
