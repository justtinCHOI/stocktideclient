import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root.tsx";

const EntirePage = lazy(() => import("@pages/stock/domestic/item/entire/Entire.tsx"));
const HoldPage = lazy(() => import("@pages/stock/domestic/item/hold/Hold.tsx"));
const WatchPage = lazy(() => import("@pages/stock/domestic/item/watch/Watch.tsx"));

const itemRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='hold' />,
        },{
            path: 'entire',
            element: <Suspense fallback={Loading}><EntirePage/></Suspense>,
        },{
            path: 'hold',
            element: <Suspense fallback={Loading}><HoldPage/></Suspense>,
        },{
            path: 'watch',
            element: <Suspense fallback={Loading}><WatchPage/></Suspense>,
        },
    ]
}

export default itemRouter
