import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  // Omit passwordHash for security
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(10) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL,
      first_name varchar(30) NOT NULL,
      last_name varchar(30) NOT NULL,
      genre varchar(60) NOT NULL,
      personal_description varchar(80),
      music_instrument varchar(80)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
