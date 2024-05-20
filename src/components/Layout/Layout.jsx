import { Suspense } from 'react';

import Navigation from '../Navigation/Navigation';

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Please wait loading page...</div>}>
        {children}
      </Suspense>
    </div>
  )
};

export default Layout;
