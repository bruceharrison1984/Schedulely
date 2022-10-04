import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tiny Install Size',
    Svg: require('@site/static/img/minimize-solid.svg').default,
    description: (
      <>
        Schedulely was designed with install size in mind. So much so, the only
        dependencies we have are React! This means the impact to your final
        bundles will be insignificant.
      </>
    ),
  },
  {
    title: 'Fast Performance',
    Svg: require('@site/static/img/gauge-high-solid.svg').default,
    description: (
      <>
        Schedulely leans on CSS-grid and CSS for display, so it is extremely
        performant. Memoization and careful planning for re-renders means only
        the smallest updates are made.
      </>
    ),
  },
  {
    title: 'Responsive',
    Svg: require('@site/static/img/up-down-left-right-solid.svg').default,
    description: (
      <>
        Schedulely has responsive design in mind and it will automatically
        adjust to whatever container you place it in. Whether you use fixed
        sizes, or dynamic sizes, Schedulely will automatically re-size in both X
        and Y.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/react.svg').default,
    description: (
      <>
        Schedulely was built using React 17, so it should be an easy drop-in
        component for any version after that.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
