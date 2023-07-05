'use server';

import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';
import { CreateMatchResponseBodyMatch } from '../../api/match/route';

export async function match(props: { postId: number; userId: number }) {
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
