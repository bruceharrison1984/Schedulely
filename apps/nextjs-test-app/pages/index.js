import { Schedulely } from 'schedulely';
import { storyEvents } from '../helpers.stories';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Schedulely SSR Test App</title>
        <meta name="description" content="Schedulely SSR Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <h2 className={styles.title}>Schedulely SSR Test</h2>
        <p className={styles.description}>
          This application simulates running Schedulely in an SSR scenario
        </p>
        <div style={{ width: '100%', height: '100%' }}>
          <Schedulely events={storyEvents} />
        </div>
      </div>
    </div>
  );
}

// force SSR
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
