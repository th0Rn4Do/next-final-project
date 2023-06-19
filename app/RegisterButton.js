'use client';

import styles from './RegisterButton.module.scss';

export default function RegisterButton() {
  return (
    <button
      className={styles.registerbutton}
      onClick={() => console.log('Register button pressed')}
    >
      Register
    </button>
  );
}
