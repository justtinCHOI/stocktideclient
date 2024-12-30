import {IncludeInformationDiv, OutletDiv} from "@assets/css/menu.tsx";
import Main from "@components/welcome/main/Main.tsx";
import Footer from "@components/welcome/Footer.tsx";
import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import useCustomMember from "@hooks/useCustomMember.ts";
import { StyledLink } from '@assets/css/common';

const Welcome = () => {

    const { loginState } = useCustomMember();
    const {doLogout, moveToPath} = useCustomMember()
    const handleClickLogout = () => {
        doLogout()
        moveToPath("/welcome")
    }

    return (
        <>
            <StockInfoHomeDiv>
                <WelcomeMessage>반가워요! StockFish 입니다.</WelcomeMessage>
                    { loginState?.email ?
                      <WelcomeLogin
                        onClick={handleClickLogout}>
                        Logout
                      </WelcomeLogin>
                        :
                      <WelcomeLogin>
                        <StyledLink to={'/member/login'}>Login</StyledLink>
                      </WelcomeLogin>
                    }
                <WelcomeSearchIcon />
            </StockInfoHomeDiv>
            <IncludeInformationDiv $top={3}>
                    <OutletDiv>
                        <Main/>
                        <Footer/>
                    </OutletDiv>
            </IncludeInformationDiv>
        </>
    );
}

export default Welcome;

const StockInfoHomeDiv = styled.div`
    background-color: royalblue;
    height: 4rem;
    display: flex;
    align-items: center;
    //justify-content: center;
    justify-content: space-around;
    font-size: 1.2rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
`;

const WelcomeMessage = styled.div`
    font-size: 1rem;
    text-decoration-color: white;
    color: white;
    display : flex;
    left : 0;
`;

const WelcomeLogin = styled.div`
    font-size: 1rem;
    text-decoration-line: underline;
    color: white;
    display : flex;
    padding-right : 35px;
`;

const WelcomeSearchIcon = styled(FaSearch)`
    position: absolute;
    color: white;
    display : flex;
    right: 28px;
`;
