import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root.tsx";

const ManagePage = lazy(() => import("@pages/myPage/account/ManagePage.tsx"))
const ExchangePage = lazy(() => import("@pages/myPage/account/ExchangePage.tsx"))
const ChargePage = lazy(() => import("@pages/myPage/account/ChargePage.tsx"))

const accountRouter = () => {

    return [
        {
            path: '',
            element: <Navigate replace to='manage' />,
        },
        {
            path: "manage",
            element: <Suspense fallback={Loading}><ManagePage/></Suspense>,
        },
        {
            path: "exchange/:cashId",
            element: <Suspense fallback={Loading}><ExchangePage/></Suspense>
        },
        {
            path: "charge/:cashId",
            element: <Suspense fallback={Loading}><ChargePage/></Suspense>,
        },
    ]
}

export default accountRouter;
