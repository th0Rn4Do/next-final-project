import styles from './page.module.scss';

export const metadata = {
  title: 'Contact us',
  description: 'Generated by create next app',
};

export default function ContactUsPage() {
  return (
    <>
      <div>
        <h1>FindAmusician - Contact us</h1>
      </div>
      {/* <main>FindAmusician - Contact us</main>; */}
      <section className={styles.contactussection}>
        <div>
          <h2>Legal</h2>
        </div>
        <section className={styles.cusubsection}>
          <div>
            <h4>Authorised process agent according to Lorem ipsum</h4>
          </div>
          <section className={styles.contactsubsubsection}>
            <div>
              Lorem ipsum dolor Rechtsanwälte LLP & Co KG
              <br />
              Lorem ipsum street 25
              <br />
              1010 Vienna
              <br />
              Austria
            </div>
          </section>
        </section>
      </section>
      <section className={styles.contactussection}>
        <div>
          <h2>Contact us</h2>
        </div>
        <section className={styles.cusubsection}>
          <div>
            <h4>Our address</h4>
          </div>
          <section className={styles.contactsubsubsection}>
            <div>
              FindAmusician LLC
              <br />
              Lorem ipsum street 3
              <br />
              1150 Vienna
              <br />
              Austria
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
