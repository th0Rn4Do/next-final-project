'use client';

import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import { useState } from 'react';
import { User } from '../../../../../migrations/1687334782-createUsers';
import styles from './DeleteForm.module.scss';

type Props = {
  user: User;
};

export default function DeleteForm({ user }: Props) {
  const [onEditId, setOnEditId] = useState<number>();
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  const [onEditGenreInput, setOnEditGenreInput] = useState('');
  const [onEditPersonalDescriptionInput, setOnEditPersonalDescriptionInput] =
    useState('');
  const [onEditMusicInstrumentInput, setOnEditMusicInstrumentInput] =
    useState('');
  const router = useRouter();

  // console.log(user);

  async function deleteAnimalById(id: number) {
    const response = await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    // Router.push.....
    router.push(`/login`);

    router.refresh();
  }

  /* console.log('oneditfristnameinput', onEditFirstNameInput); */

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
    <div>
      {/*  <label>
        First Name
        <input
          value={user.id !== onEditId ? user.firstName : onEditFirstNameInput}
          onChange={(event) =>
            setOnEditFirstNameInput(event.currentTarget.value)
          }
          disabled={user.id !== onEditId}
        />
      </label>
      <br />
      <label>
        Last Name
        <input
          value={user.id !== onEditId ? user.lastName : onEditLastNameInput}
          onChange={(event) =>
            setOnEditLastNameInput(event.currentTarget.value)
          }
          disabled={user.id !== onEditId}
        />
      </label>
      <br />
      <label>
        Genre
        <input
          value={user.id !== onEditId ? user.genre : onEditGenreInput}
          onChange={(event) => setOnEditGenreInput(event.currentTarget.value)}
          disabled={user.id !== onEditId}
        />
      </label>
      <br />
      <label>
        Personal description
        <input
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
      </label>
      <br />
      <label>
        Music instrument
        <input
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
      </label>
      <br />
      {`id on edit = ${onEditId}`}
      <br />
      <br /> */}
      {/*  {user.id === onEditId ? (
         <button
          className={styles.editbutton}
          onClick={async () => {
            setOnEditId(undefined);
            await updateUserById(user.id);
          }}
        >
          Save
        </button>
      ) : (
        <button
          className={styles.editbutton}
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
        )} */}

      <button
        className={styles.editbutton}
        onClick={async () => await deleteAnimalById(user.id)}
      >
        Delete user
      </button>
    </div>
  );
}
