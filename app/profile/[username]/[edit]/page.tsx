import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../../database/sessions';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../../database/users';
import styles from './page.module.scss';

type Props = {
  params: {
    username: string;
  };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  // if the user is NOT logged in redirect to login

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect('/login');

  const userBySession = !sessionTokenCookie.value
    ? undefined
    : await getUserBySessionToken(sessionTokenCookie.value);

  if (user.id !== userBySession?.id) {
    redirect('/');
  }

  return (
    <>
      <div>
        <h1>Edit: {user.username}</h1>
      </div>
      <section className={styles.topRowDeleteButton}>
        <Link href={`/profile/${user.username}/`}>My profile</Link>
        <div>id: {user.id}</div>
        <div>
          <Link href={`/profile/${user.username}/edit/delete`}>
            ❌ Delete user
          </Link>
        </div>
      </section>
      <section className={styles.sectionForUserData}>
        <div className={styles.boxesForUserData}>
          <div>username: {user.username}</div>
          <br />
          <div>First Name: {user.firstName}</div>
          <br />
          <div>Last Name: {user.lastName}</div>
          <br />
          <div>Genre: {user.genre}</div>
          <br />
          <div>Music instrument: {user.musicInstrument}</div>
        </div>
        <div className={styles.boxesForPersonalDescription}>
          <div>
            Personal description: <br /> <br /> {user.personalDescription}
          </div>
        </div>
      </section>
    </>
  );
}