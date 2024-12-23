import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import CompanyModifyPage from "@pages/stock/domestic/detail/CompanyModifyPage.tsx";
import {Loading} from "@router/root.tsx";

const ChartPage = lazy(() => import("@pages/stock/domestic/detail/ChartPage.tsx"));
const BuyPage = lazy(() => import("@pages/stock/domestic/detail/BuyPage.tsx"));
// const SellPage = lazy(() => import("@pages/stock/domestic/detail/SellPage.tsx"));
const InfoPage = lazy(() => import("@pages/stock/domestic/detail/InfoPage.tsx"));
const NewsPage = lazy(() => import("@pages/stock/domestic/detail/NewsPage.tsx"));
const ChatPage = lazy(() => import("@pages/stock/domestic/detail/ChatPage.tsx"));

const detailRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace to='chart' />,
        },{
            path: 'chart/:companyId',
            element: <Suspense fallback={Loading}><ChartPage/></Suspense>,
        },{
            path: 'order/:companyId',
            element: <Suspense fallback={Loading}><BuyPage/></Suspense>,
        },
        // {
        //     path: 'sell/:companyId',
        //     element: <Suspense fallback={Loading}><SellPage/></Suspense>,
        // },
        {
            path: 'detail/:companyId',
            element: <Suspense fallback={Loading}><InfoPage/></Suspense>,
        },{
            path: 'modify/:companyId',
            element: <Suspense fallback={Loading}><CompanyModifyPage/></Suspense>,
        },{
            path: 'news/:companyId',
            element: <Suspense fallback={Loading}><NewsPage/></Suspense>,
        },{
            path: 'chat/:companyId',
            element: <Suspense fallback={Loading}><ChatPage/></Suspense>,
        },
    ]
}

export default detailRouter
