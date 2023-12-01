import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  // Omit passwordHash for security
  firstName: string;
  lastName: string;
  genre: string;
  personalDescription: string;
  musicInstrument: string;
};

export type LoginUser = {
  id: number;
  username: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(10) NOT NULL UNIQUE,
        password_hash VARCHAR(80) NOT NULL,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        genre VARCHAR(60) NOT NULL,
        personal_description VARCHAR(80),
        music_instrument VARCHAR(80)
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
