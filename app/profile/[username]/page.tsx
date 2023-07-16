import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
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
      <section className={styles.topRowEditButton}>
        <h1>{user.username}'s Profile</h1>
        <div>
          <Link href={`/profile/${user.username}/edit`}>⚙️ Edit profile</Link>
        </div>
      </section>
      <section className={styles.userData}>
        <div className={styles.profileCard}>
          <div className={styles.profileCardContent}>
            <div className={styles.label}>Username</div>
            <div>{user.username}</div>
          </div>
          <div className={styles.profileCardContent}>
            <div className={styles.label}>First Name</div>
            <div>{user.firstName}</div>
          </div>
          <div className={styles.profileCardContent}>
            <div className={styles.label}>Last Name</div>
            <div>{user.lastName}</div>
          </div>
          <div className={styles.profileCardContent}>
            <div className={styles.label}>Genre</div>
            <div>{user.genre}</div>
          </div>
          <div className={styles.profileCardContent}>
            <div className={styles.label}>Music Instrument</div>
            <div>{user.musicInstrument}</div>
          </div>
          <div className={styles.profileCardContent}>
            <div className={styles.label}>Personal Description</div>
            <div>{user.personalDescription}</div>
          </div>
        </div>
      </section>
    </>
  );
}
