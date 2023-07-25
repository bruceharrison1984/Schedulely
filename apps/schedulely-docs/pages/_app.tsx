import 'schedulely/dist/index.css';
import { GoogleAnalytics, event } from 'nextjs-google-analytics';
import { NextWebVitalsMetric } from 'next/app';

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  event(name, {
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics trackPageViews gaMeasurementId="G-B7NYF75SRT" />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
