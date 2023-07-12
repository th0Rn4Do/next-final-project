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
          {/* </div> */}
          <div className={styles.backgroundoftextfield}>
            <div>
              <h1>FindAmusician - Home page</h1>
              <br />
              <div>Get your jam on</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
