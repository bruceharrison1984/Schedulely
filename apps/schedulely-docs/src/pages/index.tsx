import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageSchedulely from '../components/HomepageSchedulely/HomepageSchedulely';
import Layout from '@theme/Layout';
import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        {/* <p className="hero__subtitle">
          The super-fast, super-small React calendar
        </p> */}
        <p className="hero__subtitle">🚧 Work in progress 🚧</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} documentation`}
      description="Documentation for the Schedulely React component"
    >
      <HomepageHeader />
      <main>
        <HomepageSchedulely />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
