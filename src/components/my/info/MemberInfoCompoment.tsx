import PropTypes from 'prop-types';
import useCustomMove from "@hooks/useCustomMove.ts";
import {useEffect, useState} from "react";
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

const initState = {
    memberId : '',
    name : '',
    email: '',
    password: '',
    confirmPassword: '',
}

const MemberInfoComponent = () => {

    // 화면 이동용 함수
    const {moveToMemberModify} = useCustomMove()
    const [showPassword, setShowPassword] = useState(false)

    const [member, setMember] = useState(initState)
    const loginInfo = useSelector(state => state.loginSlice)

    useEffect(() => {
        setMember({...loginInfo})
    },[loginInfo])

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    return (

        <>
            <Container>
                {/*<FormRow display="hidden">*/}
                {/*    <Label>id</Label>*/}
                {/*    <Input*/}
                {/*        name="memberId"*/}
                {/*        type="text"*/}
                {/*        value={member.memberId}*/}
                {/*        readOnly*/}
                {/*    />*/}
                {/*</FormRow>*/}

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

                <FormRow justify="end">
                    <Button type="button" onClick={() => moveToMemberModify(member.memberId)}>
                        Modify
                    </Button>
                </FormRow>
            </Container>
            <ContentBottom/>
        </>
    )
}
MemberInfoComponent.propTypes = {
    tno: PropTypes.number.isRequired
};

export default MemberInfoComponent;
