import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root.tsx";

const SearchListPage = lazy(() => import("@pages/stock/domestic/search/SearchListPage.tsx"));

const searchRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='list' />,
        },{
            path: 'list',
            element: <Suspense fallback={Loading}><SearchListPage/></Suspense>,
        },
    ]
}

export default searchRouter
