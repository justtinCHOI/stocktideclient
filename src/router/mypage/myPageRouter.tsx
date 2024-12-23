import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import accountRouter from "@router/mypage/account/accountRouter.tsx";
import {Loading} from "@router/root.tsx";

const ProfitPage = lazy(() => import("@pages/myPage/ProfitPage.tsx"))
const MemberInfoPage = lazy(() => import("@pages/myPage/MemberInfoPage.tsx"))
const ModifyPage = lazy(() => import("@pages/myPage/ModifyPage.tsx"))
const SettingPage = lazy(() => import("@pages/myPage/SettingPage.tsx"))
const CompanyAddPage = lazy(() => import("@pages/myPage/CompanyAddPage.tsx"))
const AccountPage = lazy(() => import("@pages/myPage/account/AccountPage.tsx"))

const myPageRouter = () => {
    return[
        {
            path: '',
            element: <Navigate replace to='profit' />,
        },{
            path: 'profit',
            element: <Suspense fallback={Loading}><ProfitPage/></Suspense>
        },{
            path: 'memberInfo',
            element: <Suspense fallback={Loading}><MemberInfoPage/></Suspense>
        },{
            path:"modify",
            element: <Suspense fallback={Loading}><ModifyPage/></Suspense>,
        },{
            path: 'setting',
            element: <Suspense fallback={Loading}><SettingPage/></Suspense>
        },{
            path: 'companyAdd',
            element: <Suspense fallback={Loading}><CompanyAddPage/></Suspense>
        },{
            path: "account",
            element: <Suspense fallback={Loading}><AccountPage /></Suspense>,
            children: accountRouter()
        },
    ]
}

export default myPageRouter
