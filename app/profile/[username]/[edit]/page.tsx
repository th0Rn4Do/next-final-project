import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../../database/users';
import EditForm from './EditForm';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
  };
};

export default async function EditProfileUsernamePage({ params }: Props) {
  // if the user is NOT logged in redirect to login

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect('/login');

  const user = !sessionTokenCookie.value
    ? undefined
    : await getUserBySessionToken(sessionTokenCookie.value);

  if (!user) {
    redirect('/');
  }

  return (
    <>
      <section className={styles.topRowDeleteButton}>
        <Link href={`/profile/${user.username}/`}>My profile</Link>
        <h1>Edit {user.username}'s Profile</h1>
        <Link href={`/profile/${user.username}/edit/delete`}>
          ❌ Delete user
        </Link>
      </section>
      <section>
        <div className={styles.formborder}>
          <EditForm user={user} />
        </div>
      </section>
    </>
  );
}
