'use client';

import styles from './LoginButton.module.scss';

export default function LoginButton() {
  return (
    <button
      className={styles.loginbutton}
      onClick={() => console.log('Login button pressed')}
    >
      Login
    </button>
  );
}
