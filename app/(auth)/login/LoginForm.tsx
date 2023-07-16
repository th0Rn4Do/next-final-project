'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './LoginForm.module.scss';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    router.push(
      getSafeReturnToPath(props.returnTo) ||
        (`/profile/${data.user.username}` as Route),
    );
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Username</label>
        <input
          className={styles.formInput}
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.formInput}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </div>
      <button className={styles.button} onClick={async () => await login()}>
        Login
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
