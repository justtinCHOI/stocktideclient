import {Suspense, lazy} from "react";
import {Navigate} from "react-router-dom";
import {Loading} from "@router/root.tsx";

const memberRouter = () => {

const Login = lazy(() => import("@pages/member/login/Login.tsx"))
const KakaoRedirect = lazy(() => import("@pages/member/kakao/KakaoRedirect.tsx"))

    return [
        {
            path: '',
            element: <Navigate replace={true} to='login' />,
        },
        {
            path: "logins",
            element: <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>,
        },
    ]
}

export default memberRouter
