import {Outlet} from "react-router-dom";
import styled from "styled-components";
import BasicMenu from "@components/common/BasicMenu.jsx";
import RapidSlider from '@components/common/RapidSliderInfo/RapidSlider.tsx';

const BasicLayout = () => {
    return (
        <Container>
            <MainContent>
                <Outlet/>
            </MainContent>
            <RapidSlider/>
            <BasicMenu/>
        </Container>
    );
}

const Container = styled.div`
    background-color: #f7fafc;
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    margin: 0; /* 추가: 기본 여백 제거 */
    padding: 0; /* 추가: 기본 여백 제거 */
    overflow: hidden; /* 추가: 불필요한 스크롤 방지 */
`;

const MainContent = styled.main`
    flex: 1;
    background-color: #fff;
    margin-top: 1rem; /* Adjust this value based on the combined height of fixed components */
    overflow-y: auto;
    overflow-x: hidden;
`;

export default BasicLayout;

//전체 component 구조

// <Container>
//     <StockInfoDiv>
//         <Logo>StockFish</Logo>
//     </StockInfoDiv>
//     <MainContent>
//         <SearchCompanyComponent/>
//         <MenuComponent menus={Menus} urls={Urls}/>
//         <ContentBelowMenu >
//             <OutletDiv>
//                 <Read/>
//             </OutletDiv>
//         </ContentBelowMenu >
//     </MainContent>
//     <RapidSlider/>
//     <BasicMenu/>
// </Container>