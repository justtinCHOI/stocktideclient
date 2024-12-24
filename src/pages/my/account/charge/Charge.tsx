import ChargeComponent from '@components/my/account/charge/ChargeComponent.tsx';
import { useParams } from 'react-router';

const Charge = () => {
  const {cashId} = useParams()

  return (
    <ChargeComponent cashId={cashId}/>
  );
};

export default Charge;