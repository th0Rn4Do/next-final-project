import { Sql } from 'postgres';

export type Post = {
  id: number;
  title: string;
  userId: number;
  postDescription: string;
  postGenre: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE posts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title varchar(150) NOT NULL,
      creation_timestamp timestamp NOT NULL DEFAULT NOW(),
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      post_description varchar(150) NOT NULL,
      post_genre varchar(150) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE posts
  `;
}
