import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "@components/ErrorBoundary";
import ChatComponent from "@components/stock/detail/chat/ChatComponent";

const root = createBrowserRouter([
    {
        path: '/',
        element: (
            <ErrorBoundary>
                <ChatComponent />
            </ErrorBoundary>
        ),
        errorElement: <ErrorBoundary><div>Something went wrong!</div></ErrorBoundary>,
    }
]);


export default root;
