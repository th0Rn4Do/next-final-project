import { Sql } from 'postgres';

export type Match = {
  id: number;
  postId: number;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE matches (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      post_id integer NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE matches
  `;
}
