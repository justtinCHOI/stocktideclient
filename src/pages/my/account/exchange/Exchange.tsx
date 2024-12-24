import {useParams} from "react-router";
import ExchangeComponent from '@components/my/account/exchange/ExchangeComponent.tsx';

const Exchange = () => {

    const {cashId} = useParams()

    return (
        <ExchangeComponent cashId={cashId}/>
    );
};

export default Exchange;