import React, { useState } from 'react';
import ResultModal from "@components/common/ResultModal.tsx";
import { postAdd } from "@api/companyApi.ts";
import useCustomMove from "@hooks/useCustomMove.ts";
import {Button, ButtonRow, Container, FormRow, Input, Label} from "@assets/css/content.tsx";
import { CompanyAddState } from '@typings/company';

const initState = {
    code: '',
    korName: '',
    created_at: '',
};

function CompanyAddComponent() {

  const [company, setCompany] = useState<CompanyAddState>({
    code: '',
    korName: '',
    created_at: ''
  });
    const [result, setResult] = useState(null);
    const { moveToList } = useCustomMove();

    const handleChangeCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCompany(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleClickAdd = () => {
        postAdd(company).then(result => {
            setResult(result.companyId);
            setCompany({ ...initState });
        });
    };

    const closeModal = () => {
        setResult(null);
        moveToList();
    };

    return (
        <Container>
            <FormRow>
                <Label>코드</Label>
                <Input name="code" type="text" value={company.code} onChange={handleChangeCompany} />
            </FormRow>
            <FormRow>
                <Label>회사명</Label>
                <Input name="korName" type="text" value={company.korName} onChange={handleChangeCompany} />
            </FormRow>
            <FormRow>
                <Label>상장일</Label>
                <Input name="created_at" type="date" value={company.created_at} onChange={handleChangeCompany} />
            </FormRow>
            <ButtonRow>
                <Button onClick={handleClickAdd}>ADD</Button>
            </ButtonRow>
            {result && <ResultModal title={'Add Title'} content={`New ${result} Added`} callbackFn={closeModal} />}
        </Container>
    );
}

export default CompanyAddComponent;


