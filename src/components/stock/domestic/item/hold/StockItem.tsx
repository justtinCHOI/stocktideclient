// import { useState } from "react";
// import styled from "styled-components";
// import logo from "@assets/images/StockHolmImage.png";
//
// import star_icon from "@asset/icon/star_icon.png";
// import star_filled_icon from "@asset/icon/star_filled_icon.png";
//
// // import usePostStar from "@hooks/stars/usePoststars";
// // import useDeleteStar from "@hooks/stars/useDeletestars";
// // import useGetStar from "@hooks/stars/useGetstars";
//
// import useCustomMove from "@hooks/useCustomMove.ts";
// import {logoList} from "@utils/companyLogos.ts";
// import PropTypes from "prop-types";

const StockItem = () => {
// const StockItem = ({ companyData, stockData }) => {
//     const [showChangePrice, setShowChangePrice] = useState(false);
//     const {
//         stockCount,
//         reserveSellStockCount,
//         totalPrice,
//         percentage,
//         stockReturn,
//     } = stockData;
//     const totalStocksHeld = stockCount + reserveSellStockCount;
//     const company = companyData || {};
//
//     const {
//         code = "",
//         korName = "",
//         stockPrice = "",
//         stockChangeAmount = "",
//         stockChangeRate = "",
//     } = company;
//
//     const price = parseInt(stockPrice);
//     const priceChangeAmount = parseInt(stockChangeAmount);
//
//     const formattedPercentage = parseFloat(percentage.toFixed(2));
//
//     const logos = {
//         ...logoList
//     };
//
//     const companyLogo = company ? logos[company.korName] || logo : logo;
//
//     const {moveToRead} = useCustomMove();
//
//     // const [isHovering, setIsHovering] = useState(false);
//
//     // const dispatch = useDispatch();
//
//     const handleItemClick = () => {
//         moveToRead(company.companyId);
//     };
//
//     // const toggleFavorite = () => {
//     //     if (isFavorited) {
//     //         deleteMutation.mutate(stockData.companyId);
//     //     } else {
//     //         postMutation.mutate(stockData.companyId);
//     //     }
//     //     setIsFavorited(!isFavorited);
//     // };
//     // const { data: starredData } = useGetStar();
//     // const starredCompanyIds =
//     //     starredData?.map((item) => item.companyResponseDto.companyId) || [];
//     //
//     // const [isFavorited, setIsFavorited] = useState(
//     //     starredCompanyIds.includes(stockData.companyId)
//     // );
//     // const postMutation = usePostStar();
//     // const deleteMutation = useDeleteStar();

    return (
        <></>
        // <EntireContainer>
        //     <ItemContainer
        //         onClick={handleItemClick}
        //         // onMouseEnter={() => {
        //         //     setShowChangePrice(true);
        //         //     setIsHovering(true);
        //         // }}
        //         // onMouseLeave={() => {
        //         //     setShowChangePrice(false);
        //         //     setIsHovering(false);
        //         // }}
        //     >
        //         <LogoContainer>
        //             <Logo src={companyLogo} alt="stock logo"/>
        //
        //         </LogoContainer>
        //         <StockInfo>
        //             <StockName>{korName}</StockName>
        //             <StockCode>{code}</StockCode>
        //         </StockInfo>
        //         <StockPriceSection>
        //             <StockPrice priceChangeAmount={priceChangeAmount}>
        //                 {price.toLocaleString()} 원
        //             </StockPrice>
        //             <StockChange
        //                 priceChangeAmount={priceChangeAmount}
        //                 onMouseEnter={() => setShowChangePrice(true)}
        //                 onMouseLeave={() => setShowChangePrice(false)}
        //             >
        //                 {showChangePrice
        //                     ? `${priceChangeAmount.toLocaleString()} 원`
        //                     : `${stockChangeRate}%`}
        //             </StockChange>
        //         </StockPriceSection>
        //     </ItemContainer>
        //     <StockDetails>
        //         <DetailSection01>
        //             <DetailTitle>수익</DetailTitle>
        //             <DetailTitle>보유</DetailTitle>
        //         </DetailSection01>
        //         <DetailSection02>
        //             <ColoredDetailData priceChangeAmount={priceChangeAmount}>
        //                 {stockReturn.toLocaleString()} 원
        //             </ColoredDetailData>
        //             <DetailData>{totalPrice.toLocaleString()} 원</DetailData>
        //         </DetailSection02>
        //         <DetailSection03>
        //             <ColoredDetailData priceChangeAmount={priceChangeAmount}>
        //                 {formattedPercentage}%
        //             </ColoredDetailData>
        //             <DetailTitle>{totalStocksHeld}주</DetailTitle>
        //         </DetailSection03>
        //     </StockDetails>
        // </EntireContainer>
    );
};

export default StockItem;
//
// StockItem.propTypes = {
//     stockData: PropTypes.shape({
//         stockHoldId: PropTypes.number.isRequired,
//         memberId: PropTypes.number.isRequired,
//         companyId: PropTypes.number.isRequired,
//         companyKorName: PropTypes.string.isRequired,
//         stockCount: PropTypes.number.isRequired,
//         totalPrice: PropTypes.number.isRequired,
//         percentage: PropTypes.number.isRequired,
//         stockReturn: PropTypes.number.isRequired,
//         reserveSellStockCount: PropTypes.number.isRequired,
//     }).isRequired,
//     companyData: PropTypes.shape({
//         companyId: PropTypes.number.isRequired,
//         code: PropTypes.string.isRequired,
//         korName: PropTypes.string.isRequired,
//         stockPrice: PropTypes.string.isRequired,
//         stockChangeAmount: PropTypes.string.isRequired,
//         stockChangeRate: PropTypes.string.isRequired,
//     }).isRequired,
// };
//
// const EntireContainer = styled.div`
//     &:hover {
//         background-color: #d9e6ff;
//         transition: background-color 0.5s ease;
//         cursor: pointer;
//     }
// `;
//
// const ItemContainer = styled.div`
//     display: flex;
//     align-items: center;
//     width: 100%;
//     padding: 12px 0;
//     border-bottom: 1px solid #e0e0e0;
// `;
//
// const LogoContainer = styled.div`
//     flex: 1 0 0;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding-left: 12px;
// `;
//
// const Logo = styled.img`
//     border-radius: 50%;
//     width: 28px;
//     height: 28px;
//     position: absolute;
//     opacity: ${(props) => props.opacity};
// `;
//
// const FavoriteStar = styled.div`
//     position: absolute;
//     width: 28px;
//     height: 28px;
//     background: url(${star_icon}) no-repeat center;
//     background-size: contain;
//     cursor: pointer;
//     opacity: ${(props) => props.opacity};
// `;
//
// const FavoriteStarFilled = styled(FavoriteStar)`
//     background: url(${star_filled_icon}) no-repeat center;
//     background-size: contain;
// `;
//
// const StockInfo = styled.div`
//     flex: 5 0 0;
//     height: 100%;
//     padding-top: 3px;
//     padding-left: 6px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
// `;
//
// const StockName = styled.span`
//     font-size: 15px;
//     font-weight: 400;
// `;
//
// const StockCode = styled.span`
//     color: darkgray;
//     font-weight: 400;
//     font-size: 13px;
// `;
//
// const StockPriceSection = styled.div`
//     flex: 5 0 0;
//     padding-top: 3px;
//     margin-left: auto;
//     padding-right: 12px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
// `;
//
// const StockPrice = styled.span`
//     color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
//     font-size: 15px;
// `;
//
// const StockChange = styled.span`
//     color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
//     font-size: 13px;
//     cursor: pointer;
// `;
//
// const StockDetails = styled.div`
//     display: flex;
//     align-items: center;
//     padding-top: 11px;
//     padding-bottom: 11px;
//     border-bottom: 1px solid darkgray;
//     width: 100%;
// `;
//
// const DetailSection01 = styled.div`
//     flex: 1.4 0 0;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     padding-left: 12px;
//     gap: 2px;
// `;
//
// const DetailSection02 = styled.div`
//     flex: 4 0 0;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: center;
//     gap: 2px;
//     padding-left: 3px;
// `;
//
// const DetailSection03 = styled.div`
//     flex: 4 0 0;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-end;
//     gap: 2px;
//     padding-left: 10px;
//     padding-right: 12px;
// `;
//
// const DetailTitle = styled.span`
//     font-weight: light;
//     font-size: 14px;
// `;
//
// const DetailData = styled.span`
//     font-size: 14px;
// `;
//
// const ColoredDetailData = styled.span`
//     color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
//     font-size: 14px;
// `;
