import { cookies } from 'next/headers';
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

  const userBySession = !sessionTokenCookie.value
    ? undefined
    : await getUserBySessionToken(sessionTokenCookie.value);

  const user = await getUserByUsername(params.username);
  /* const user = await getUserByUsername(params.username); */

  if (!user) {
    notFound();
  }

  if (user.id !== userBySession?.id) {
    redirect('/');
  }

  return (
    <div>
      <label>
        First Name
        <input value={user.firstName} />
      </label>
      <br />
      <label>
        Last Name
        <input value={user.lastName} />
      </label>
      <br />
      <label>
        Genre
        <input value={user.genre} />
      </label>
      <br />
      <label>
        Personal description
        <input value={user.personalDescription} />
      </label>
      <br />
      <label>
        Music instrument
        <input value={user.musicInstrument} />
      </label>
      <br />
      <br />
      <button className={styles.editbutton}>Create</button>
      {JSON.stringify(user)}
      <button className={styles.editbutton}>Delete</button>
    </div>
  );
}
