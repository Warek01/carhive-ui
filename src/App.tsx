import { FC } from 'react';

import { renderProviders } from '@carhive/lib/app-providers';

import './index.scss';

const App: FC = () => {
  return renderProviders(null);
};

export default App;
