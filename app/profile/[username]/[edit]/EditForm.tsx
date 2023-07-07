'use client';

import { useState } from 'react';
import { User } from '../../../../migrations/1687334782-createUsers';
import styles from './EditForm.module.scss';

type Props = {
  user: User[];
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

  // console.log(user);

  return (
    <div>
      <label>
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
      {user.id === onEditId ? (
        <button
          className={styles.editbutton}
          onClick={() => setOnEditId(undefined)}
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
      )}
    </div>
  );
}
