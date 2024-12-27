import { Link } from "react-router-dom";
import styled from "styled-components";
import { FC } from 'react';
const BasicMenu: FC = () => {
    return (
        <Footer>
            <FooterHome><Link to={'/home'}>홈</Link> </FooterHome>
            <FooterNav>
                <FooterMenu>
                    <FooterMenuItem><Link to={'/stock/'}>국내주식</Link> </FooterMenuItem>
                    <FooterMenuItem><Link to={'/stock/'}>해외주식</Link></FooterMenuItem>
                    <FooterMenuItem><Link to={'/my/'}>마이페이지</Link></FooterMenuItem>
                </FooterMenu>
            </FooterNav>
        </Footer>
    );
}
export default BasicMenu;

const Footer = styled.footer`
    background-color: #000;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    //justify-content: center;
    padding: 8px;
`;

const FooterNav = styled.nav`
    display: flex;
    align-items: center;
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    &:before {
        content: '';
        position: absolute;
        left: 55px;
        width: 20%;
        height: 95%;
        background: linear-gradient(to left, transparent, #000);
        pointer-events: none;
    }
    &:after {
        content: '';
        position: absolute;
        right: 2px;
        width: 20%;
        height: 100%;
        pointer-events: none;
        flex: 1;
        background: linear-gradient(to right, transparent, #000);
    }
`;

const FooterHome = styled.div`
    //border : 4px solid blue;
    flex-shrink: 0;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    font-weight: bold;
    background-color: #000;
`;

const FooterMenu = styled.div`
    display: flex;
    flex-shrink: 0;
    &::after {
        content: '';
        flex: 1;
        background: linear-gradient(to right, transparent, #000);
    }
`;

const FooterMenuItem = styled.div`
    flex-shrink: 0;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
    &:hover {
        background-color: #333;
    }
`;