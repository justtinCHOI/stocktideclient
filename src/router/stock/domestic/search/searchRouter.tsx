import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root.tsx";

const Search = lazy(() => import("@pages/stock/domestic/search/Search"));

const searchRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='list' />,
        },{
            path: 'list',
            element: <Suspense fallback={Loading}><Search/></Suspense>,
        },
    ]
}

export default searchRouter
