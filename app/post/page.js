import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';
import { getUserBySessionToken } from '../../database/users';
import styles from './page.module.scss';
import PostForm from './PostForm';

export const metadata = {
  title: 'New post',
  description: 'Generated by create next app',
};

export default async function NewPostPage() {
  // if the user is NOT logged in redirect to login

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  const user = await getUserBySessionToken(sessionTokenCookie.value);
  console.log(user);
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect('/login');
  return (
    <>
      <div>
        <h1>FindAmusician - Create new post</h1>
      </div>
    <div className={styles.postformborder}>
    <PostForm userId={user.id} />
</div>
    { /* return;  <main>FindAmusician - New post page</main>; */ }
    </>
  );
}