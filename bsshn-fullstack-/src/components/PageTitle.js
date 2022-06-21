import { Helmet } from 'react-helmet';

export const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>BSSHN | {title}</title>
    </Helmet>
  );
};
