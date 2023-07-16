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
      <button
        className={styles.button}
        onClick={async () => await deleteAnimalById(user.id)}
      >
        Delete user
      </button>
    </div>
  );
}
