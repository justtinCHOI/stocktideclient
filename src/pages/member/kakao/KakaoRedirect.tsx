import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import useCustomLogin from "@hooks/useCustomLogin.ts";
import {getAccessToken, getMemberWithAccessToken} from "@api/kakaoApi.ts";
import {login} from "@slices/loginSlice.ts";
import {IncludeInformationDiv, OutletDiv} from "@assets/css/menu.tsx";

const KakaoRedirect = () => {

    const [searchParams] = useSearchParams()

    const {moveToPath} = useCustomLogin()

    const authCode = searchParams.get("code")//인증코드

    const dispatch = useDispatch();

    //getKakaoLoginLink : kakaoURL -> 인가코드
    //getAccessToken : 인가코드 -> accessToken
    //getMemberWithAccessToken : accessToken -> info
    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            getMemberWithAccessToken(accessToken).then(memberInfo => {
            console.log("info : ", memberInfo)
                dispatch(login(memberInfo))
                if (memberInfo) {
                    if (memberInfo.email) {
                        moveToPath("/");
                    } else {
                        if (confirm("일반회원으로 전환하시겠습니까?")) {
                            moveToPath("/my/modify");
                        }
                    }
                }
            })
        })
    }, [authCode])

    return (
        <IncludeInformationDiv $top={2}>
            <OutletDiv>
                <div>Kakao Login Redirect</div>
                <div>{authCode}</div>
            </OutletDiv>
        </IncludeInformationDiv>
    )
}

export default KakaoRedirect;
