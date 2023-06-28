import { cache } from 'react';
import { User } from '../migrations/1687334782-createUsers';
import { Post } from '../migrations/1687631080-createPosts';
import { sql } from './connect';

type PostWithPasswordHash = Post & {
  passwordHash: string;
  firstName: string;
  lastName: string;
  genre: string;
  personalDescription: string;
  musicInstrument: string;
};
/*
type UserWithPasswordHash = User & {
  passwordHash: string;
  firstName: string;
  lastName: string;
  genre: string;
  personalDescription: string;
  musicInstrument: string;
};
*/

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<PostWithPasswordHash[]>`
    SELECT * FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

    return user;
  },
);

// checken ob ich das richtig gemacht hab
export const getPostByUserId = cache(async (userid: number) => {
  const [post] = await sql<Post[]>`
    SELECT
      id,
      title,
      creation_timestamp,
      user_id,
      post_description,
      post_genre
    FROM
      posts
    WHERE
      posts.user_id = ${userid}
 `;

  return post;
});

export const createPost = cache(
  async (
    title: string,
    userId: number,
    postDescription: string,
    postGenre: string,
  ) => {
    // console.log(passwordHash);
    const [post] = await sql<Post[]>`
    INSERT INTO posts
      (title, user_id, post_description, post_genre)
    VALUES
      (${title}, ${userId}, ${postDescription}, ${postGenre})
    RETURNING
    id,
    title,
    user_id,
    post_description,
    post_genre
 `;

    return post;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});