import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGaugeHigh,
  faMinimize,
  faUpDownLeftRight,
} from '@fortawesome/free-solid-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon?: IconProp;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tiny Install Size',
    icon: faMinimize,
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
    icon: faGaugeHigh,
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
    icon: faUpDownLeftRight,
    description: (
      <>
        Schedulely has responsive design in mind and it will automatically
        adjust to whatever container you place it in.
      </>
    ),
  },
  {
    title: 'Powered by React',
    icon: faReact,
    description: (
      <>
        Schedulely was built using React 17, so it should be an easy drop-in
        component for any version after that.
      </>
    ),
  },
];

function Feature({ title, description, icon }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <FontAwesomeIcon icon={icon} size={'2x'} />
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
