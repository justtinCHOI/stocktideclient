import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import useCustomMember from "@hooks/useCustomMember.ts";
import KakaoLoginComponent from '@components/member/kakao/KakaoLoginComponent.tsx';
import { LoginState } from '@typings/member';

const initState: LoginState = {
    email: '',
    password: ''
};

const LoginComponent: FC = () => {
    const [loginParam, setLoginParam] = useState<LoginState>({ ...initState });
    const { doLogin } = useCustomMember();
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginParam(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClickLogin = () => {
        doLogin(loginParam).then(data => {
            if (data.error) {
                alert("이메일과 패스워드를 다시 확인하세요");
            } else {
                alert("로그인 성공");
                navigate(from.pathname, { replace: true });
            }
        });
    };
    const handleClickSignin = () => {
        //todo
    };

    return (
        <Container>
            <InputContainer>
                <Label>이메일</Label>
                <Input
                    name="email"
                    type="text"
                    value={loginParam.email}
                    onChange={handleChange}
                />
            </InputContainer>
            <InputContainer>
                <Label>비밀번호</Label>
                <Input
                    name="password"
                    type="password"
                    value={loginParam.password}
                    onChange={handleChange}
                />
            </InputContainer>
            <ButtonContainer>
                <Button onClick={handleClickLogin}>로그인</Button>
                <Button onClick={handleClickSignin}>회원가입</Button>
            </ButtonContainer>
            <KakaoLoginComponent />
        </Container>
    );
};

export default LoginComponent;

// Styled Components
const Container = styled.div`
    margin-top: 6rem;
  .flex {
    display: flex;
    justify-content: center;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Label = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: left;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #999;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.div`
    padding: 0.8rem;
    width: 8rem;
    margin: 0 1rem;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: #0056b3;
    }
`;
