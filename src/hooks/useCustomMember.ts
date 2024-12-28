import {useNavigate} from "react-router-dom";
import { loginRequest, logout } from '@slices/memberSlice.ts';
import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState, store } from '@/store.tsx';
import { CustomLoginHook } from '@typings/hooks';
import { LoginParam, MemberSliceState } from '@typings/member';
import { Member } from '@typings/entity';

const useCustomMember = (): CustomLoginHook => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const memberState = useSelector((state: RootState) => state.memberSlice) as MemberSliceState;
  const loginState = memberState.member as Member;
  const isLogin = !!memberState.member?.email;

  const doLogin = async (loginParam: LoginParam) => {
    dispatch(loginRequest(loginParam));
    // Saga에서 처리되는 로직을 기다림
    return new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState().memberSlice as MemberSliceState;
        if (!state.loading) {
          unsubscribe();
          resolve(state);
        }
      });
    });
  };

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

export default useCustomMember
