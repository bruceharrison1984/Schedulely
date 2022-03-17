import './DefaultHeaderBanner.scss';
import { HeaderBannerComponent } from '@/types/index';

export const DefaultHeaderBanner: HeaderBannerComponent = ({ month, year }) => {
  return (
    <h1 className="calendo--default-header-banner">
      {month} - {year}
    </h1>
  );
};
