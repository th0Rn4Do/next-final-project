'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import { CreatePostResponseBodyPost } from '../api/post/route';
import { CreateMatchResponseBodyMatch } from './api/match/route';
import styles from './MatchForm.module.scss';

export default function MatchForm(props: { postId: number; userId: number }) {
  /*  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [genre, setGenre] = useState('');
  const [personalDescription, setPersonalDescription] = useState('');
  const [musicInstrument, setMusicInstrument] = useState(''); */
  const [error, setError] = useState('');
  /* const [title, setTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postGenre, setPostGenre] = useState(''); */

  const router = useRouter();

  async function createMatch() {
    const response = await fetch('/api/match', {
      method: 'POST',
      body: JSON.stringify({
        /* username,
        password,
        firstName,
        lastName,
        genre,
        personalDescription,
        musicInstrument, */

        /* title,
        userId: props.userId,
        postDescription,
        postGenre, */

        postId: props.postId,
        userId: props.userId,
      }),
    });

    const data: CreateMatchResponseBodyMatch = await response.json();

    if ('error' in data) {
      setError(data.error);
      return;
    }

    // console.log(data.post);
    // router.push(`/profile/${data.post.title}`);
    // we may have in the future revalidatePath()
    router.refresh();
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <button
        className={styles.postbutton}
        onClick={async () => await createMatch()}
      >
        Create new Match
      </button>
      {error !== '' && <div className={styles.posterror}>{error}</div>}
    </form>
  );
}
