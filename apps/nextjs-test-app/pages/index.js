import { Schedulely } from 'schedulely';
import { storyEvents } from '../helpers.stories';
import Head from 'next/head';
import Image from 'next/image';
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
        <div style={{ width: '100%', height: '100%' }}>
          <Schedulely events={storyEvents} />
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

// force SSR
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
