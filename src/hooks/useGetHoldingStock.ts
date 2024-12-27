import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import jwtAxios from "@utils/jwtUtil.tsx";
import { API_SERVER_HOST } from "@api/memberApi.js";
import { StockHoldResponseDto } from '@typings/dto.d.ts';
import { RootState } from '../store.tsx';

const host = `${API_SERVER_HOST}/api/stock`;

const getHoldingStock = async (memberId: number, companyId: number): Promise<StockHoldResponseDto[]> => {
    const response = await jwtAxios.get(`${host}/stockholds/${memberId}`, { params: { companyId } });
    return response.data;
};

const useGetHoldingStock = (companyId: number) => {
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const isLogin = !!loginState.email;
    const memberId = loginState.memberId;

    const { data, isLoading, isError } = useQuery(
        ["holdingStock", memberId, companyId],
        () => getHoldingStock(memberId, companyId),
        {
            enabled: isLogin,
        }
    );

    return { holdingStockData: data, holdingStockLoading: isLoading, holdingStockError: isError };
};

export default useGetHoldingStock;
