import { useDispatch, useSelector } from "react-redux";
import {createCashAsync, deleteCashAsync, getCashListAsync, setCashId, updateCashAsync} from "@slices/cashSlice.ts";
import {useNavigate} from "react-router-dom";

const useCustomCash = () => {
    const dispatch = useDispatch();
    const cashState = useSelector(state => state.cashSlice);
    const navigate = useNavigate();

    const doCreateCash = async (memberId) => {
        const action = await dispatch(createCashAsync(memberId));
        return action.payload;
    }

    const doGetCashList = async (memberId) => {
        const action = await dispatch(getCashListAsync(memberId));
        return action.payload;
    }

    const doDeleteCash = async (cashId) => {
        const action = await dispatch(deleteCashAsync(cashId));
        return action.payload;
    }

    const doUpdateCash = async (cashId, money, dollar) => {
        console.log("doUpdateCash cashId money : ", cashId, money, dollar);
        const action = await dispatch(updateCashAsync({ cashId, money , dollar}));
        return action.payload;
    }

    const doUpdateCashId = (cashId) => {
        dispatch(setCashId(cashId));
    }

    const moveToManage = () => { //----------------------로그인 페이지로 이동 // 이벤트 기반
        navigate({pathname: '/mypage/account/manage'}, {replace:true})
    }

    return { cashState, doUpdateCashId, doCreateCash, doGetCashList, doDeleteCash, doUpdateCash, moveToManage  };
}

export default useCustomCash;
