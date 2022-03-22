import { HeaderBannerComponent } from '@/types/index';

export const DefaultHeaderBanner: HeaderBannerComponent = ({ month, year }) => {
  return (
    <h1 className="schedulely--default-header-banner">
      {month} - {year}
    </h1>
  );
};
