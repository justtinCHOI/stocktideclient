import { RouterProvider } from 'react-router-dom';
import root from "./router/root.tsx";
import ErrorBoundary from '@components/ErrorBoundary.tsx';

const App = () => {
    return (
        <ErrorBoundary>
            <RouterProvider router={root} />
        </ErrorBoundary>
    );
};
export default App;