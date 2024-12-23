import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root.tsx";

const memberRouter = () => {

const LoginPage = lazy(() => import("@pages/member/LoginPage.tsx"))
const KakaoRedirectPage = lazy(() => import("@pages/member/KakaoRedirectPage.tsx"))

    return [
        {
            path: '',
            element: <Navigate replace={true} to='login' />,
        },
        {
            path: "login",
            element: <Suspense fallback={Loading}><LoginPage/></Suspense>
        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirectPage/></Suspense>,
        },
    ]
}

export default memberRouter
