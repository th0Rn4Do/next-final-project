import Image from 'next/image';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <>
      <main>
        <div className={styles.backgroundoftextfield}>
          <h1>FindAmusician</h1>
          <h2>Get your jam on</h2>
        </div>
        <div className={styles.intro}>
          Welcome to FindAmusician - the ultimate platform for music
          enthusiasts! Are you ready to get your jam on? FindAmusician is here
          to connect musicians from all walks of life, allowing you to discover
          like-minded artists, create incredible music, and take your passion
          for music to new heights. Whether you're a solo musician seeking a
          band to join, a songwriter looking for collaborators, or a band
          searching for that missing piece, FindAmusician has got you covered.
          Our platform is designed to help you find the perfect musical match,
          unlock your creativity, and embark on unforgettable musical journeys.
        </div>
      </main>
    </>
  );
}
