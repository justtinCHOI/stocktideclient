import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root.tsx";

const Chart = lazy(() => import("@pages/stock/domestic/detail/chart/Chart.tsx"));
const Buy = lazy(() => import("@pages/stock/domestic/detail/buy/Buy.tsx"));
const Sell = lazy(() => import("@pages/stock/domestic/detail/sell/Sell.tsx"));
const CompanyInfo = lazy(() => import("@pages/stock/domestic/detail/info/CompanyInfo.tsx"));
const CompanyModify = lazy(() => import("@pages/stock/domestic/detail/modify/CompanyModify.tsx"));
const News = lazy(() => import("@pages/stock/domestic/detail/news/News.tsx"));
const Chat = lazy(() => import("@pages/stock/domestic/detail/chat/Chat.tsx"));

const detailRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace to='chart' />,
        },
        {
            path: 'chart/:companyId',
            element: <Suspense fallback={Loading}><Chart/></Suspense>,
        },
        {
            path: 'buy/:companyId',
            element: <Suspense fallback={Loading}><Buy/></Suspense>,
        },
        {
            path: 'sell/:companyId',
            element: <Suspense fallback={Loading}><Sell/></Suspense>,
        },
        {
            path: 'detail/:companyId',
            element: <Suspense fallback={Loading}><CompanyInfo/></Suspense>,
        },
        {
            path: 'modify/:companyId',
            element: <Suspense fallback={Loading}><CompanyModify/></Suspense>,
        },
        {
            path: 'news/:companyId',
            element: <Suspense fallback={Loading}><News/></Suspense>,
        },
        {
            path: 'chat/:companyId',
            element: <Suspense fallback={Loading}><Chat/></Suspense>,
        },
    ]
}

export default detailRouter
