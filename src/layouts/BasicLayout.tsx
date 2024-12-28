import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import BasicMenu from "@components/common/BasicMenu";
import RapidSlider from '@components/common/RapidSliderInfo/RapidSlider';

const BasicLayout: FC = () => {
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
    height: 100vh;
    width: 100vw;
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

// 전체 component 구조

// stock

// <Container>
//     <MainContent>
//         <StockInfoComponent/>
//         <SearchCompanyComponent/>
//         <IncludeInformationDiv $top={5} >
//             <MenuComponent menus={Menus} urls={Urls}/>
//             <ContentBelowMenu >
//                 <OutletDiv>
//                     <Outlet/>
//                 </OutletDiv>
//             </ContentBelowMenu >
//         </IncludeInformationDiv>
//     </MainContent>
//     <RapidSlider/>
//     <BasicMenu/>
// </Container>

// welcome

// <Container>
//   <MainContent>
//     <StockInfoHomeDiv>
//       <WelcomeMessage></WelcomeMessage>
//       <WelcomeLogin></WelcomeLogin>
//       <WelcomeSearchIcon />
//     </StockInfoHomeDiv>
//     <IncludeInformationDiv $top={3}>
//       <OutletDiv>
//         <Main/>
//         <Footer/>
//       </OutletDiv>
//     </IncludeInformationDiv>
//   </MainContent>
//   <RapidSlider/>
//   <BasicMenu/>
// </Container>