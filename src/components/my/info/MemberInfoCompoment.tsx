import useCustomMove from "@hooks/useCustomMove.ts";
import { FC, useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import {FaEye, FaEyeSlash} from "react-icons/fa";

import {
    Button,
    Container,
    ContentBottom,
    FormRow,
    Icon,
    Input,
    InputWrapper,
    Label
} from "@assets/css/content.tsx";
import { RootState } from '@/store.tsx';
import { MemberState } from '@typings/member';

const initState = {
    memberId : 0,
    name : '',
    email: '',
    password: '',
    confirmPassword: '',
}

const MemberInfoComponent: FC = () => {

    // 화면 이동용 함수
    const {moveToMemberModify} = useCustomMove()
    const [showPassword, setShowPassword] = useState(false)

    const [member, setMember] = useState<MemberState>(initState)
    const loginInfo = useSelector((state: RootState) => state.loginSlice)

    useEffect(() => {
        setMember({...loginInfo})
    },[loginInfo])

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (

        <>
            <Container>
                <FormRow>
                    <Label>이름</Label>
                    <Input
                        name="name"
                        type="text"
                        value={member.name}
                        readOnly
                    />
                </FormRow>

                <FormRow>
                    <Label>이메일</Label>
                    <Input
                        name="email"
                        type="email"
                        value={member.email}
                        readOnly
                    />
                </FormRow>

                <FormRow>
                    <Label>비밀번호</Label>
                    <InputWrapper>
                        <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={member.password}
                            readOnly
                        />
                        <Icon onClick={toggleShowPassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Icon>
                    </InputWrapper>
                </FormRow>

                <FormRow style={{justifyContent: 'end'}}>
                    <Button type="button" onClick={() => moveToMemberModify()}>
                        Modify
                    </Button>
                </FormRow>
            </Container>
            <ContentBottom/>
        </>
    )
}

export default MemberInfoComponent;
