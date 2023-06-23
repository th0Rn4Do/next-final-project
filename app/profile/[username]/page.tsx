import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
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

  return (
    <>
      <div>id: {user.id}</div>
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
