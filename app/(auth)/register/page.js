import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import styles from './page.module.scss';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register',
  description: 'Generated by create next app',
};

export default async function RegisterPage() {
  // if the user is logged in redirect

  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (session) redirect('/');
  return (
    <>
      <div>
        <h1 className={styles.header}>FindAmusician - Register</h1>
      </div>
      <div className={styles.formborder}>
        <RegisterForm />
      </div>
    </>
  );
}
