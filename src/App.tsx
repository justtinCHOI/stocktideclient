import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './store.tsx';
import root from '@router/root.tsx';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={root} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;