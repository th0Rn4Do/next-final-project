'use client';

import { useState } from 'react';
import { User } from '../../../../migrations/1687334782-createUsers';
import styles from './EditForm.module.scss';

type Props = {
  user: User[];
};

export default function EditForm({ user }: Props) {
  const [onEditId, setOnEditId] = useState<number>();

  console.log(user);

  return (
    <div>
      <label>
        First Name
        <input value={user.firstName} />
      </label>
      <br />
      <label>
        Last Name
        <input value={user.lastName} />
      </label>
      <br />
      <label>
        Genre
        <input value={user.genre} />
      </label>
      <br />
      <label>
        Personal description
        <input value={user.personalDescription} />
      </label>
      <br />
      <label>
        Music instrument
        <input value={user.musicInstrument} />
      </label>
      <br />
      {`id on edit = ${onEditId}`}
      <br />
      <button
        className={styles.editbutton}
        onClick={() => setOnEditId(user.id)}
      >
        Edit
      </button>
      <button
        className={styles.editbutton}
        onClick={() => setOnEditId(undefined)}
      >
        Save
      </button>
    </div>
  );
}
