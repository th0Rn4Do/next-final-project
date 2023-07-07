import { cache } from 'react';
import { User } from '../migrations/1687334782-createUsers';
import { sql } from './connect';

type UserWithPasswordHash = User & {
  passwordHash: string;
  firstName: string;
  lastName: string;
  genre: string;
  personalDescription: string;
  musicInstrument: string;
};

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username,
      first_name,
      last_name,
      genre,
      personal_description,
      music_instrument
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

  return user;
});

export const createUser = cache(
  async (
    username: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    genre: string,
    personalDescription: string,
    musicInstrument: string,
  ) => {
    // console.log(passwordHash);
    const [user] = await sql<User[]>`
    INSERT INTO users
      (username, password_hash, first_name, last_name, genre, personal_description, music_instrument)
    VALUES
      (${username.toLowerCase()}, ${passwordHash}, ${firstName},  ${lastName}, ${genre}, ${personalDescription}, ${musicInstrument})
    RETURNING
      id,
      username
 `;

    return user;
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

export const getUserByUserId = cache(async (userId: number) => {
  const [user] = await sql<User[]>`
    SELECT
      username,
      first_name
    FROM
      users
    WHERE
      users.id = ${userId}
 `;

  return user;
});

export const getAllUsers = cache(async () => {
  const users = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  `;

  return users;
});

export const updateUserById = cache(
  async (
    id: number,
    firstName: string,
    lastName: string,
    genre: string,
    personalDescription?: string,
    musicInstrument?: string,
  ) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        genre = ${genre},
        personal_description = ${personalDescription || null},
        music_instrument = ${musicInstrument || null}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return user;
  },
);

export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    DELETE FROM
      users
    WHERE
      id = ${id}
    RETURNING *
  `;
  return user;
});
