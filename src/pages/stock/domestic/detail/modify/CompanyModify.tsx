import {useParams} from "react-router";
import CompanyModifyComponent from '@components/stock/domestic/detail/modify/CompanyModifyComponent.tsx';

function CompanyModify() {

    const {companyId} = useParams()

    const companyIdNumber = Number(companyId); // 숫자로 변환

    return (
        <CompanyModifyComponent companyId={companyIdNumber}/>

    );
}

export default CompanyModify;