import {useSelector} from "react-redux";
import {useMutation, useQueryClient} from "react-query";
import jwtAxios from "@utils/jwtUtil.tsx";
import {API_SERVER_HOST} from "@api/memberApi.js";
import {useParams} from "react-router";
import { RootState } from '../store.tsx';

const host = `${API_SERVER_HOST}/api/stock`;

const useTradeStock = () => {
    const { companyId } = useParams();
    const numericCompanyId = companyId ? parseInt(companyId, 10) : 0;
    const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
    const orderPrice = useSelector((state: RootState) => state.stockOrderPriceSlice);
    const orderVolume = useSelector((state: RootState) => state.stockOrderVolumeSlice);
    const loginState = useSelector((state: RootState) => state.loginSlice);
    const memberId = loginState.memberId;

    const queryClient = useQueryClient();
    return useMutation(
        async () => postOrderRequest(orderType, numericCompanyId, orderPrice, orderVolume, memberId),
        {
            onSuccess: () => {
                //현금 데이터, 보유한 주식 데이터,  주문 기록 데이터
                queryClient.invalidateQueries("cash").then();
                queryClient.invalidateQueries("holdingStock").then();
                queryClient.invalidateQueries("orderRecord").then();

                // 중복되는 커스텀훅 -> 일단 기능구현 위해 처리함
                queryClient.invalidateQueries("stockHolds").then();
                queryClient.invalidateQueries("money").then();
            },
        }
    );
};

export default useTradeStock;

const postOrderRequest = async (orderType:boolean , companyId:number, price:number, volume:number, memberId:number) => {
    if (!orderType) {
        // 매수
        const response = await jwtAxios.post(`${host}/buy?companyId=${companyId}&price=${price}&stockCount=${volume}&memberId=${memberId}`);
        return response.data;
    } else {
        // 매도
        const response = await jwtAxios.post(`${host}/stock/sell?companyId=${companyId}&price=${price}&stockCount=${volume}`);
        return response.data;
    }
};
