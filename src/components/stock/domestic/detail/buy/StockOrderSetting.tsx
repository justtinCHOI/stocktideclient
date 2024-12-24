import { useSelector, useDispatch } from "react-redux";
import { orderTypeBuying, orderTypeSelling } from "@slices/stockOrderTypeSlice.ts"
import styled from "styled-components";
import useGetStockInfo from "@hooks/useGetStockInfo.ts";
import {useParams} from "react-router";

import PriceSetting from "./PriceSetting.js";
import VolumeSetting from "./VolumeSetting.tsx";
import OrderDecisionBtn from "./OrderDecisionBtn.js";

const orderType01 = "매수";
const orderType02 = "매도";

const StockOrderSetting = () => {
    const dispatch = useDispatch();
    const orderType = useSelector((state) => state.stockOrderTypeSlice);
    const {companyId} = useParams();

    const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);

    if (!stockInfo) {
        return null;
    }

    if (stockInfoLoading) { return <></>; }

    if (stockInfoError) { return <></>;  }

    const handleSetBuying = () => {
        dispatch(orderTypeBuying());
    };

    const handleSetSelling = () => {
        dispatch(orderTypeSelling());
    };

    return (
        <Container>
            <div className="OrderType">
                <Buying onClick={handleSetBuying} $ordertype={orderType}>
                    {orderType01}
                </Buying>
                <Selling onClick={handleSetSelling} $ordertype={orderType}>
                    {orderType02}
                </Selling>
            </div>
            <OrderTypeChangeEffectLine />
            <PriceSetting stockInfo={stockInfo.stockAsBiResponseDto} companyId={Number(companyId)} />
            <VolumeSetting />
            <OrderDecisionBtn />
        </Container>
    );
};

export default StockOrderSetting;

const OrderTypeChangeEffectLine = () => {
    const orderType = useSelector((state) => state.stockOrderTypeSlice);

    return (
        <DividingContainer >
            <DefaultLine $ordertype={orderType}>
                <DividingLine $ordertype={orderType} />
            </DefaultLine>
        </DividingContainer>
    );
};

const Container = styled.div`
    width: 51%;
    height: 100%;

    .OrderType {
        width: 100%;
        height: 31px;
        display: flex;
        flex-direction: row;
        color: #9999;
    }
`;

const Buying = styled.div`
    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    font-size: 14px;
    color: ${(props) => !props.$ordertype && "#e22926"};
    transition: color 0.5s;
`;

const Selling = styled.div`
    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    font-size: 14px;
    color: ${(props) => props.$ordertype && "#2679ed"};
    transition: color 0.5s;
`;

const DividingContainer = styled.div`
    background-color: darkgray;
`;

const DefaultLine = styled.div`
    transform: translateX(${(props) => (props.$ordertype ? "50%" : "0")});
    transition: transform 0.3s ease-in-out;
    width: 100%;
    height: 2px;
`;

const DividingLine = styled.div`
    width: 50%;
    height: 2px;
    background-color: ${(props) => (props.$ordertype ? "#2679ed" : "#e22926")};
`;
