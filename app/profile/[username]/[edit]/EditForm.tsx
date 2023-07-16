'use client';

import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { useState } from 'react';
import { User } from '../../../../migrations/1687334782-createUsers';
import styles from './EditForm.module.scss';

type Props = {
  user: User;
};

export default function EditForm({ user }: Props) {
  const [onEditId, setOnEditId] = useState<number>();
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  const [onEditGenreInput, setOnEditGenreInput] = useState('');
  const [onEditPersonalDescriptionInput, setOnEditPersonalDescriptionInput] =
    useState('');
  const [onEditMusicInstrumentInput, setOnEditMusicInstrumentInput] =
    useState('');
  const router = useRouter();

  async function deleteAnimalById(id: number) {
    const response = await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    router.push(`/login`);

    router.refresh();
  }

  async function updateUserById(id: number) {
    const response = await fetch(`/api/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        lastName: onEditLastNameInput,
        genre: onEditGenreInput,
        personalDescription: onEditPersonalDescriptionInput,
        musicInstrument: onEditMusicInstrumentInput,
      }),
    });

    const data = await response.json();
  }

  return (
    <div className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>First name</label>
        <input
          className={styles.formInput}
          value={user.id !== onEditId ? user.firstName : onEditFirstNameInput}
          onChange={(event) =>
            setOnEditFirstNameInput(event.currentTarget.value)
          }
          disabled={user.id !== onEditId}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Last name</label>
        <input
          className={styles.formInput}
          value={user.id !== onEditId ? user.lastName : onEditLastNameInput}
          onChange={(event) =>
            setOnEditLastNameInput(event.currentTarget.value)
          }
          disabled={user.id !== onEditId}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Genre</label>
        <input
          className={styles.formInput}
          value={user.id !== onEditId ? user.genre : onEditGenreInput}
          onChange={(event) => setOnEditGenreInput(event.currentTarget.value)}
          disabled={user.id !== onEditId}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Music instrument(s)</label>
        <textarea
          className={styles.formTextarea}
          value={
            user.id !== onEditId
              ? user.musicInstrument
              : onEditMusicInstrumentInput
          }
          onChange={(event) =>
            setOnEditMusicInstrumentInput(event.currentTarget.value)
          }
          disabled={user.id !== onEditId}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Personal description</label>
        <textarea
          className={styles.formTextarea}
          value={
            user.id !== onEditId
              ? user.personalDescription
              : onEditPersonalDescriptionInput
          }
          onChange={(event) =>
            setOnEditPersonalDescriptionInput(event.currentTarget.value)
          }
          disabled={user.id !== onEditId}
        />
      </div>

      {user.id === onEditId ? (
        <button
          className={styles.button}
          onClick={async () => {
            setOnEditId(undefined);
            await updateUserById(user.id);
          }}
        >
          Save
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => {
            setOnEditId(user.id);
            setOnEditFirstNameInput(user.firstName);
            setOnEditLastNameInput(user.lastName);
            setOnEditGenreInput(user.genre);
            setOnEditPersonalDescriptionInput(user.personalDescription);
            setOnEditMusicInstrumentInput(user.musicInstrument);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
