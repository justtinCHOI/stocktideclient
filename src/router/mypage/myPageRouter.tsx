import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import accountRouter from "@router/mypage/account/accountRouter.tsx";
import {Loading} from "@router/root.tsx";

const ProfitPage = lazy(() => import("@pages/my/ProfitPage.tsx"))
const MemberInfoPage = lazy(() => import("@pages/my/MemberInfoPage.tsx"))
const MemberModifyPage = lazy(() => import("@pages/my/ModifyPage.tsx"))
const SettingPage = lazy(() => import("@pages/my/SettingPage.tsx"))
const CompanyAddPage = lazy(() => import("@pages/my/CompanyAddPage.tsx"))
const AccountPage = lazy(() => import("@pages/my/account/AccountPage.tsx"))

const myPageRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace to='profit' />,
        },
        {
            path: 'profit',
            element: <Suspense fallback={Loading}><ProfitPage/></Suspense>
        },
        {
            path: 'info',
            element: <Suspense fallback={Loading}><MemberInfoPage/></Suspense>
        },
        {
            path:"modify",
            element: <Suspense fallback={Loading}><MemberModifyPage/></Suspense>,
        },
        {
            path: 'setting',
            element: <Suspense fallback={Loading}><SettingPage/></Suspense>
        },
        {
            path: 'add',
            element: <Suspense fallback={Loading}><CompanyAddPage/></Suspense>
        },
        {
            path: "account",
            element: <Suspense fallback={Loading}><AccountPage /></Suspense>,
            children: accountRouter()
        },
    ]
}

export default myPageRouter
