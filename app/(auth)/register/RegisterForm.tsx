'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [genre, setGenre] = useState('');
  const [personalDescription, setPersonalDescription] = useState('');
  const [musicInstrument, setMusicInstrument] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        firstName,
        lastName,
        genre,
        personalDescription,
        musicInstrument,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    // console.log(data.user);
    router.push(`/profile/${data.user.username}`);
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
      <div className={styles.formGroup}>
        <label className={styles.label}>First name</label>
        <input
          className={styles.formInput}
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Last name</label>
        <input
          className={styles.formInput}
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Genre</label>
        <input
          className={styles.formInput}
          value={genre}
          onChange={(event) => setGenre(event.currentTarget.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Personal description</label>
        <textarea
          className={styles.formTextarea}
          value={personalDescription}
          onChange={(event) =>
            setPersonalDescription(event.currentTarget.value)
          }
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Music instrument(s)</label>
        <textarea
          className={styles.formTextarea}
          value={musicInstrument}
          onChange={(event) => setMusicInstrument(event.currentTarget.value)}
        />
      </div>
      <div className={styles.formButton}>
        <button
          className={styles.button}
          onClick={async () => await register()}
        >
          Sign up
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            await setUsername('');
            await setPassword('');
            await setFirstName('');
            await setLastName('');
            await setGenre('');
            await setPersonalDescription('');
            await setMusicInstrument('');
          }}
        >
          Clear all
        </button>
      </div>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
