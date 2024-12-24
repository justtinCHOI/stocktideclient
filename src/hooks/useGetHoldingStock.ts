import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import jwtAxios from "@utils/jwtUtil.tsx";
import { API_SERVER_HOST } from "@api/memberApi.js";

const host = `${API_SERVER_HOST}/api/stock`;

const getHoldingStock = async (memberId, companyId) => {
    const response = await jwtAxios.get(`${host}/stockholds/${memberId}`, { params: { companyId } });
    return response.data;
};

const useGetHoldingStock = (companyId) => {
    const loginState = useSelector((state) => state.loginSlice);

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
