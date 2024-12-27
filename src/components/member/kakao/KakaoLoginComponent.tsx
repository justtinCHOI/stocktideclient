import {Link} from "react-router-dom";
import {getKakaoLoginLink} from "@api/kakaoApi.js";
import kakaoLogo from "@assets/images/KakaoLogo.svg";
import styled from "styled-components";
import { FC } from 'react';

const KakaoLoginComponent: FC = () => {

    const link = getKakaoLoginLink()

    return (
        <Link to={link}>
            <KakaoButton>
                <LogoImage src={kakaoLogo} alt="Kakao Logo"/>
                KAKAO LOGIN
            </KakaoButton>
        </Link>
    )
}

export default KakaoLoginComponent;

const KakaoButton = styled.div`
    margin: 10px auto;
    padding: 10px 20px;
    background-color: #FFFFFF;
    border: 1px solid lightgray;
    border-radius: 5px;
    cursor: pointer;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #f2f2f2; // 호버 시 밝은 회색 배경 적용
    }
`;

const LogoImage = styled.img`
    margin-right: 30px;
    width: 60px;
    height: auto;
`;
