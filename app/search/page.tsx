import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getAllPosts, getAllPostsByUserId } from '../../database/posts';
import { getValidSessionByToken } from '../../database/sessions';
import { getUserBySessionToken } from '../../database/users';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
  };
};

export default async function SearchPage({ params }: Props) {
  // if the user is NOT logged in redirect to login

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  // if (!session) redirect('/login');

  const allPosts = await getAllPosts();
  // console.log(allPosts);

  return (
    <>
      <div>
        <h1>FindAmusician - Search</h1>
      </div>
      This are all posts
      <section className={styles.boxForAllPostsInSearch}>
        {allPosts.map((post) => {
          return (
            <div key={`post-div-${post.id}`}>
              <div className={styles.boxForPostInSearch}>
                {post.title}
                <br />
                {post.postDescription}
                <br />
                {post.postGenre}
                <br />
              </div>
            </div>
          );
        })}
      </section>
      <div>{/* <SearchForm /> */}</div>
      {/* <main>FindAmusician - Search</main> */}
    </>
  );
}
