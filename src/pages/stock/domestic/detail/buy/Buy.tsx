import {useParams} from "react-router";
import BuyComponent from '@components/stock/domestic/detail/buy/BuyComponent.tsx';

function Buy() {

    const {companyId} = useParams()

    return (
        <BuyComponent companyId={Number(companyId)} />
    );
}

export default Buy;
