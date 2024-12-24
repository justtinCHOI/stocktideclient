import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import root from "./router/root";
import ErrorBoundary from '@components/ErrorBoundary';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={root} />
    </ErrorBoundary>
  );
};

export default App;