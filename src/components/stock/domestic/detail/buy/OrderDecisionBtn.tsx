import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import useGetCash from "@hooks/useGetCash.ts";
import {setStockOrderVolume} from "@slices/stockOrderVolumeSlice.ts";
import {openDecisionWindow} from "@slices/decisionWindowSlice.ts";
import { RootState } from '../../../../../store.tsx';

const availableMoneyText01 = "최대";
const availableMoneyText02 = "원";
const totalAmountText = "주문총액";
const totalAmountUnit = "원";

const OrderDecisionBtn = () => {

    let cash = '';

    const {cashData} = useGetCash();
    if (cashData) {
        cash = cashData.toLocaleString();
    }

    const dispatch = useDispatch();
    const orderType = useSelector((state: RootState) => state.stockOrderTypeSlice);
    const orderPrice = useSelector((state: RootState) => state.stockOrderPriceSlice);
    const orderVolume = useSelector((state: RootState) => state.stockOrderVolumeSlice);
    const [totalOrderAmount, setTotalOrderAmount] = useState(0);

    const orderBtnText = orderType ? "매도" : "매수";

    const handleOpenDecisionWindow = () => {
        dispatch(openDecisionWindow());
    };

    useEffect(() => {
        setTotalOrderAmount(orderPrice * orderVolume);
    }, [orderPrice, orderVolume]);

    useEffect(() => {
        dispatch(setStockOrderVolume(0));
        setTotalOrderAmount(0);
    }, [orderType]);

    return (
        <div className="container">
            <AvailableMoney $orderType={orderType}>
                <span>{availableMoneyText01}</span>
                <span className="availableMoney">{cash}</span>
                <span>{availableMoneyText02}</span>
            </AvailableMoney>
            <TotalAmount>
                <div className="totalAmountText">{totalAmountText}</div>
                <div className="totalAmount">{totalOrderAmount.toLocaleString()}</div>
                <div>{totalAmountUnit}</div>
            </TotalAmount>
            <OrderBtn $orderType={orderType} onClick={handleOpenDecisionWindow}>
                {orderBtnText}
            </OrderBtn>
        </div>
    );
};

export default OrderDecisionBtn;

export interface OrderTypeProps {
    $orderType: boolean;
}

const AvailableMoney = styled.div<OrderTypeProps>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 4px;

    & span {
        font-size: 14px;
        color: ${(props) => (props.$orderType ? "white" : "#999999")};
    }

    .availableMoney {
        color: ${(props) => (props.$orderType ? "white" : "#ed2926")};
    }
`;

const TotalAmount = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 4px;
    gap: 4px;

    & div {
        font-size: 13px;
        color: #999999;
        display: flex;
        align-items: center;
    }

    .totalAmountText {
        flex: 8 0 0;
    }

    .totalAmount {
        color: black;
        font-size: 15.5px;
    }
`;

const OrderBtn = styled.button<OrderTypeProps>`
    width: 100%;
    height: 32px;
    margin-top: 16px;
    border: none;
    border-radius: 0.25rem;
    background-color: ${(props) => (props.$orderType ? "#2679ed" : "#e22926")};
    transition: background-color 0.5s;
    color: #ffffff;
    font-weight: 400;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.$orderType ? "#034baf" : "#c20d09")};
        transition: background-color 0.5s ease;
    }
`;
