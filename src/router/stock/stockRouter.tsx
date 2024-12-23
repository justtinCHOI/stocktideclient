import {lazy, Suspense} from "react";
import {Navigate} from "react-router";
import domesticRouter from "@router/stock/domestic/domesticRouter.tsx";
import {Loading} from "@router/root.tsx";

const DomesticPage = lazy(() => import("@pages/stock/domestic/domesticPage.tsx"));

const stockRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace={true} to='items' />,
        },{
            path: 'domestic',
            element: <Suspense fallback={Loading}><DomesticPage/></Suspense>,
            children: domesticRouter()
        },{
            // path: 'overseas',
            // element: <Suspense fallback={Loading}><OverseasPage/></Suspense>,
            // children: overseasRouter()
        },
    ]
}

export default stockRouter;
