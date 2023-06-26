import Image from 'next/image';
import testpic from '../public/images/atestpic.jpeg';
import LoginButton from './LoginButton';
import styles from './page.module.scss';
import RegisterButton from './RegisterButton';

export default function HomePage() {
  return (
    <>
      <main>
        <div className={styles.centerbackgroundimage}>
          {/* still need to work on this */}
          <nav>
            {/* <div>
            <RegisterButton />
          </div>
          <div>
            <LoginButton />
          </div> */}
          </nav>
          {/*}
            <Image
              src="/images/atestpic.jpeg"
              alt="test"
              width="200"
              height="200"
            />
          {/* </div> */}
          <div className={styles.backgroundoftextfield}>
            <div>FindAmusician - Home page</div>
          </div>
        </div>
      </main>
    </>
  );
}
