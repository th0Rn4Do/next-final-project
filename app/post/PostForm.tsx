'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreatePostResponseBodyPost } from '../api/post/route';
import styles from './PostForm.module.scss';

export default function PostForm(props: { userId: number }) {
  /*  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [genre, setGenre] = useState('');
  const [personalDescription, setPersonalDescription] = useState('');
  const [musicInstrument, setMusicInstrument] = useState(''); */
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postGenre, setPostGenre] = useState('');

  const router = useRouter();

  async function createPost() {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        /* username,
        password,
        firstName,
        lastName,
        genre,
        personalDescription,
        musicInstrument, */

        title,
        userId: props.userId,
        postDescription,
        postGenre,
      }),
    });

    const data: CreatePostResponseBodyPost = await response.json();

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
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.formInput}
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.formTextarea}
          value={postDescription}
          onChange={(event) => setPostDescription(event.currentTarget.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Genre</label>
        <textarea
          className={styles.formTextarea}
          value={postGenre}
          onChange={(event) => setPostGenre(event.currentTarget.value)}
        />
      </div>
      <button
        className={styles.button}
        onClick={async () => {
          await createPost();
          await setTitle('');
          await setPostDescription('');
          await setPostGenre('');
        }}
      >
        Create new post
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
