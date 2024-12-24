import { styled } from "styled-components";
import { dummyLogo, logoList } from "@utils/companyLogos.ts"

import PropTypes from "prop-types";

const volumeText = "거래량";

const StockOverview = ({ stockInfo, stockInfoLoading, stockInfoError }) => {

    const corpName = stockInfo?.korName;

    const logos = {
        ...logoList
    };

    const companyLogo = corpName ? logos[corpName] || dummyLogo : dummyLogo;
    if (!corpName) {
        return null;
    }

    if (stockInfoLoading) {
        return <p>로딩 중 입니다</p>;
    }
    if (stockInfoError) {
        return <p>에러 발생</p>;
    }

    const stockPrice = parseInt(stockInfo.stockPrice, 10).toLocaleString();
    const priceChangeRate = parseFloat(stockInfo.priceChangeRate);
    const changeDirection = priceChangeRate > 0 ? "▲" : "▼";
    const priceChangeAmount = Math.abs(parseInt(stockInfo.priceChangeAmount, 10)).toLocaleString();
    const transactionVolume = parseInt(stockInfo.transactionVolume, 10).toLocaleString();

    return (
        <Container $priceChangeRate={priceChangeRate}>
            <img className="CorpLogo" src={companyLogo} alt="stock logo" />
            <div className="CorpName">{corpName}</div>
            <div className="StockPrice">{stockPrice}</div>
            <div className="PriceChangeRate">{priceChangeRate}%</div>
            <div className="PriceChangeAmount">
                <div className="changeDirection">{changeDirection}</div> {priceChangeAmount}
            </div>
            <TransactionVolume>
                <span>{volumeText}</span>
                {transactionVolume}
            </TransactionVolume>
        </Container>
    );
};

export default StockOverview;


const Container = styled.div`
    flex: 7 0 0;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    gap: 8px;
    justify-content: space-evenly;
    &::-webkit-scrollbar {
        display: none;
    }
    .CorpLogo {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }
    .CorpName {
        white-space: nowrap;
        min-width: min-content;
        font-size: 14px;
        font-weight: 530;
    }
    .StockCode {
        white-space: nowrap;
        min-width: min-content;
        font-size: 11px;
        color: #999999;
    }
    .StockPrice {
        font-size: 14px;
        color: ${(props) => (props.$priceChangeRate > 0 ? "#ed2926" : props.$priceChangeRate === 0 ? "black" : "#3177d7")};
        font-weight: 530;
    }
    .PriceChangeRate,
    .PriceChangeAmount {
        font-size: 14px;
        color: ${(props) => (props.$priceChangeRate > 0 ? "#ed2926" : props.$priceChangeRate === 0 ? "black" : "#3177d7")};
        display: flex;
        flex-direction: row;
        gap: 2px;
        .changeDirection {
            font-size: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

StockOverview.propTypes = {
    stockInfo: PropTypes.shape({
        korName: PropTypes.string,
        code: PropTypes.string,
        stockPrice: PropTypes.string,
        priceChangeRate: PropTypes.string,
        priceChangeAmount: PropTypes.string,
        transactionVolume: PropTypes.string,
        amount: PropTypes.string,
    }),
    stockInfoLoading: PropTypes.bool,
    stockInfoError: PropTypes.bool,
};

const TransactionVolume = styled.div`
    white-space: nowrap;
    min-width: min-content;
    font-size: 11px;
    color: #4e4d4d;

    & span {
        color: #999999;
        padding-right: 5px;
    }
`;
