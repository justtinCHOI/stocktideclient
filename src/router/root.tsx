import {createBrowserRouter, Navigate} from "react-router-dom";
// import ErrorBoundary from "@components/ErrorBoundary.tsx";
import {lazy, Suspense} from "react";
import stockRouter from "@router/stock/stockRouter.tsx";
import myPageRouter from "@router/mypage/myPageRouter.tsx";
import memberRouter from "@router/member/memberRouter.tsx";
import PrivateRoute from '@components/PrivateRoute.tsx';

export const Loading = (
    <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#F4F4F4' }}
    >
        <p>Loading...</p>
    </div>
);

const Stock = lazy(() => import("@pages/stock/Stock"));
const Welcome = lazy(() => import("@pages/welcome/Welcome"));
const My = lazy(() => import("@pages/my/My"));
const BasicLayout = lazy(() => import("@layouts/BasicLayout"));
const Member = lazy(() => import("@pages/member/Member"));
const NotFound = lazy(() => import('@pages/NotFound'));

const root = createBrowserRouter([
    {
        path: '',
        element:
            // <ErrorBoundary>
                <Suspense fallback={Loading}>
                    <BasicLayout/>
                </Suspense>,
            // </ErrorBoundary>,
        children: [
            {
                path: '',
                element: <Navigate replace to='/welcome' />,
            },
            {
                path: 'welcome',
                element: (
                  <Suspense fallback={Loading}>
                      <Welcome />
                  </Suspense>
                ),
            },
            {
                path: 'stock',
                element: (
                  <PrivateRoute>
                      <Suspense fallback={Loading}>
                          <Stock />
                      </Suspense>
                  </PrivateRoute>
                ),
                children: stockRouter()
            },
            {
                path: 'my',
                element: (
                  <PrivateRoute>
                      <Suspense fallback={Loading}>
                          <My />
                      </Suspense>
                  </PrivateRoute>
                ),
                children: myPageRouter()
            },
            {
                path: "member",
                element: (
                  <Suspense fallback={Loading}>
                      <Member />
                  </Suspense>
                ),
                children: memberRouter()
            },
            {
                path: '*',
                element: (
                  <Suspense fallback={Loading}>
                      <NotFound />
                  </Suspense>
                ),
            },
        ]
    }
]);

export default root;
