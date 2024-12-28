import {useNavigate} from "react-router-dom";
import {loginPostAsync, logout} from "@slices/loginSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from '@/store.tsx';
import { CustomLoginHook, LoginParam } from '@typings/hooks';

const useCustomLogin = (): CustomLoginHook => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector((state: RootState) => state.loginSlice);

  const isLogin = !!loginState.email //----------로그인 여부

  const doLogin = async (loginParam: LoginParam) => { //----------로그인 함수
    const action = await dispatch(loginPostAsync(loginParam))
    return action.payload
  }

  const doLogout = () => { //---------------로그아웃 함수
    dispatch(logout())
  }

  const moveToPath = (path: string) => {  //----------------페이지 이동
    navigate({pathname: path}, {replace:true})
  }

  const moveToLogin = () => { //----------------------로그인 페이지로 이동 // 이벤트 기반
    navigate({pathname: '/member/login'}, {replace:true})
  }

  return  {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin}

}

export default useCustomLogin
