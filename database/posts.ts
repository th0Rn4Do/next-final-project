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

type PostWithUser = Post & {
  username: string;
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

export const getAllPosts = cache(async () => {
  const posts = await sql<Post[]>`
  SELECT
    posts.id,
    posts.title,
    posts.user_id,
    posts.post_description,
    posts.post_genre
  FROM
    posts
  `;

  return posts;
});

export const getAllPostsWithUserId = cache(async () => {
  const posts = await sql<PostWithUser[]>`
  SELECT
    posts.id,
    posts.title,
    posts.user_id,
    posts.post_description,
    posts.post_genre,
    users.id,
    users.username
  FROM
    posts
  INNER JOIN
    users ON (
      posts.user_id = users.id
      )
  `;

  return posts;
});

export const getAllPostsByUserId = cache(async (userId: number) => {
  const posts = await sql<Post[]>`
  SELECT
    posts.id,
    posts.title,
    posts.user_id,
    posts.post_description,
    posts.post_genre
  FROM
    posts
  INNER JOIN
    users ON (
      users.id = ${userId} AND
      users.id = posts.user_id
      )
  `;

  return posts;
});

export const getAllPostsByUser = cache(async (userId: number) => {
  const posts = await sql<PostWithUser[]>`
    SELECT
      posts.id,
      posts.title,
      posts.user_id,
      posts.post_description,
      posts.post_genre,
      users.id,
      users.username
    FROM
      posts
    INNER JOIN
      users ON posts.user_id = users.id
    WHERE
      posts.user_id = ${userId}
  `;

  return posts;
});

export const getAllPostsFromOtherUsers = cache(async (userId: number) => {
  const posts = await sql<PostWithUser[]>`
    SELECT
      posts.id,
      posts.title,
      posts.user_id,
      posts.post_description,
      posts.post_genre,
      users.id,
      users.username
    FROM
      posts
    INNER JOIN
      users ON posts.user_id = users.id
    WHERE
      posts.user_id != ${userId}
  `;

  return posts;
});
