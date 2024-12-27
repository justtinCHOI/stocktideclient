import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import jwtAxios from "@utils/jwtUtil.tsx";
import { API_SERVER_HOST } from "@api/memberApi.js";
import { GetCashResponse } from '@typings/hooks';
import { RootState } from '../store.tsx';

const host = `${API_SERVER_HOST}/api/cash`;

const getCashData = async (memberId: number): Promise<number> => {
    const response = await jwtAxios.get(`${host}/one/${memberId}`);
    return response.data.money;
};

const useGetCash = (): GetCashResponse => {
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const isLogin = !!loginState.email;
    const memberId = loginState.memberId;

    const { data, isLoading, isError } = useQuery(
        ["cash", memberId],
        () => getCashData(memberId),
        {
            enabled: isLogin,
        }
    );

    return { cashData: data, cashLoading: isLoading, cashError: isError };
};

export default useGetCash;
