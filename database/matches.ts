import { cache } from 'react';
import { Match } from '../migrations/1687631099-createMatches';
import { sql } from './connect';

export const deleteMatch = cache(async () => {
  await sql`
    DELETE FROM
      matches
    WHERE
      id == id
  `;
});

export const createMatch = cache(async (postId: number, userId: number) => {
  const [match] = await sql<Match[]>`
    INSERT INTO matches
      (post_id, user_id)
    VALUES
      (${postId}, ${userId})
    RETURNING
      id,
      post_id,
      user_id
  `;

  return match;
});
