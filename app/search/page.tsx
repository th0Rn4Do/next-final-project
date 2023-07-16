import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllPostsFromOtherUsers } from '../../database/posts';
import { getValidSessionByToken } from '../../database/sessions';
import { getUserBySessionToken } from '../../database/users';
import MatchForm from '../MatchForm';
import styles from './page.module.scss';

export default async function SearchPage() {
  // if the user is NOT logged in redirect to login

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    redirect('/login');
  }

  const user = await getUserBySessionToken(sessionTokenCookie.value);

  if (!user) {
    redirect('/login');
  }

  const posts = await getAllPostsFromOtherUsers(user.id);

  return (
    <>
      <h1 className={styles.header}>FindAmusician - 🔍 Search</h1>

      <section className={styles.boxForAllPostsInSearch}>
        {posts.map((post) => {
          return (
            <div key={`post-div-${post.id}`} className={styles.post}>
              <h2 className={styles.subHeader}>{post.title}</h2>
              <h2 className={styles.descriptionHeader}>Description</h2>
              <div className={styles.description}>{post.postDescription}</div>
              <h2 className={styles.genreHeader}>Genre</h2>
              <div className={styles.genre}>{post.postGenre}</div>
              <div className={styles.posted}>posted by: {post.username}</div>
              <div className={styles.matchForm}>
                <MatchForm postId={post.id} userId={post.userId} />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
