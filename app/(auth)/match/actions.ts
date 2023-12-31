'use server';

import { cookies } from 'next/headers';
import { useState } from 'react';
import { deleteSessionByToken } from '../../../database/sessions';
import { CreateMatchResponseBodyMatch } from '../../api/match/route';

export async function match(props: { postId: number; userId: number }) {
  const [error, setError] = useState('');

  await async function createMatch() {
    const response = await fetch('/api/match', {
      method: 'POST',
      body: JSON.stringify({
        /* username,
        password,
        firstName,
        lastName,
        genre,
        personalDescription,
        musicInstrument, */

        postId: props.postId,
        userId: props.userId,
      }),
    });
    const data: CreateMatchResponseBodyMatch = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }
  };
}
