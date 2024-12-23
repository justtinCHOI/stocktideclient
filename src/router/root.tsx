import {createBrowserRouter, Navigate} from "react-router-dom";
import ErrorBoundary from "@components/ErrorBoundary";
import ChatComponent from "@components/stock/info/chat/ChatComponent";
import {lazy, Suspense} from "react";
import stockRouter from "@router/stock/stockRouter.tsx";
import myPageRouter from "@router/mypage/myPageRouter.tsx";
import memberRouter from "@router/member/memberRouter.tsx";

export const Loading = (
    <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#F4F4F4' }}
    >
        <p>Loading...</p>
    </div>
);

const Stock = lazy(() => import("@pages/stock/Stock.tsx"));
const Home = lazy(() => import("@pages/home/Home.tsx"));
const MyPage = lazy(() => import("@pages/myPage/MyPage.tsx"));
const BasicLayout = lazy(() => import("../layouts/BasicLayout.tsx"));
const MemberPage = lazy(() => import("@pages/member/MemberPage.tsx"));

const root = createBrowserRouter([
    {
        path: '',
        element:
            <ErrorBoundary>
                <Suspense fallback={Loading}>
                     <ChatComponent />
                </Suspense>
            </ErrorBoundary>,
        children: [
            {
                path: '',
                element: <Navigate replace to='/home' />,
            },{
                path: 'home',
                element: <Suspense fallback={Loading}><Home /></Suspense>,
            },{
                path: 'stock',
                element: <Suspense fallback={Loading}><Stock /></Suspense>,
                children: stockRouter()
            },{
                path: 'myPage',
                element: <Suspense fallback={Loading}><MyPage /></Suspense>,
                children: myPageRouter()
            },{
                path: "member",
                element: <Suspense fallback={Loading}><MemberPage /></Suspense>,
                children: memberRouter()
            }
        ]
    }


]);

export default root;
