import { cookies } from 'next/headers';
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
      <EditForm user={user} />
    </div>
  );
}
