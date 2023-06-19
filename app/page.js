import Image from 'next/image';
import testpic from '../public/images/atestpic.jpeg';
import LoginButton from './LoginButton';
import styles from './page.module.scss';
import RegisterButton from './RegisterButton';

export default function HomePage() {
  return (
    <>
      <main>
        <nav>
          <div>
            <RegisterButton />
          </div>
          <div>
            <LoginButton />
          </div>
        </nav>
        <div>
          <Image
            src="/backgroundimages/atestpic.jpeg"
            alt="test"
            width="200"
            height="200"
          />
          <div className={styles.backgroundoftextfield}>
            <div>FindAmusician - Home page</div>
          </div>
        </div>
      </main>
    </>
  );
}
