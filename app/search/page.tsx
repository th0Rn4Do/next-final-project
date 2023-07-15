import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import {
  getAllPosts,
  getAllPostsByUserId,
  getAllPostsWithUserId,
} from '../../database/posts';
import { getValidSessionByToken } from '../../database/sessions';
import { getAllUsers, getUserBySessionToken } from '../../database/users';
import { MatchButton } from '../MatchButton';
import MatchForm from '../MatchForm';
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

  const allUsers = await getAllUsers();
  // console.log(allUsers);

  const allPostsWithUser = await getAllPostsWithUserId();
  // console.log(allPostsWithUser);

  return (
    <>
      <div>
        <h1>FindAmusician - Search</h1>
      </div>
      <div className={styles.searchbar}>🔍 Search</div>
      <section className={styles.boxForAllPostsInSearch}>
        {allPostsWithUser.map((post) => {
          return (
            <div key={`post-div-${post.id}`}>
              <div className={styles.boxForPostInSearch}>
                <h2>{post.title}</h2>
                <p>{post.postDescription}</p>
                <p>Genre: {post.postGenre}</p>
                <p>posted by: {post.username}</p>
                <MatchForm postId={post.id} userId={post.userId} />
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
