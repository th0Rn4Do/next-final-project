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

    console.log(data.user);
    router.push(`/profile/${data.user.username}`);
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        username:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <label>
        First name:
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Last name:
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <label>
        Genre:
        <input
          value={genre}
          onChange={(event) => setGenre(event.currentTarget.value)}
        />
      </label>
      <label>
        Personal description:
        <input
          value={personalDescription}
          onChange={(event) =>
            setPersonalDescription(event.currentTarget.value)
          }
        />
      </label>
      <label>
        Music instrument:
        <input
          value={musicInstrument}
          onChange={(event) => setMusicInstrument(event.currentTarget.value)}
        />
      </label>
      <button
        className={styles.registerbutton}
        onClick={async () => await register()}
      >
        Sign up
      </button>
      {error !== '' && <div className={styles.registererror}>{error}</div>}
    </form>
  );
}
