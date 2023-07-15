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
    <form onSubmit={(event) => event.preventDefault()}>
      {/* <label>
        username:
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <label>
        First name:
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.currentTarget.value)}
        />
      </label>
      <label>
        Last name:
        <input
          value={lastName}
          onChange={(event) => setLastName(event.currentTarget.value)}
        />
      </label>
      <label>
        Genre:
        <input
          value={genre}
          onChange={(event) => setGenre(event.currentTarget.value)}
        />
      </label>
      <label>
        Personal description:
        <input
          value={personalDescription}
          onChange={(event) =>
            setPersonalDescription(event.currentTarget.value)
          }
        />
      </label>
      <label>
        Music instrument:
        <input
          value={musicInstrument}
          onChange={(event) => setMusicInstrument(event.currentTarget.value)}
        />
      </label> */}
      <label>
        Title:
        <input
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={postDescription}
          onChange={(event) => setPostDescription(event.currentTarget.value)}
        />
      </label>
      <br />
      <label>
        Genre:
        <textarea
          value={postGenre}
          onChange={(event) => setPostGenre(event.currentTarget.value)}
        />
      </label>
      <button
        className={styles.postbutton}
        onClick={async () => {
          await createPost();
          await setTitle('');
          await setPostDescription('');
          await setPostGenre('');
        }}
      >
        Create new post
      </button>
      {error !== '' && <div className={styles.posterror}>{error}</div>}
    </form>
  );
}
