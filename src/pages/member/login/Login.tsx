import {IncludeInformationDiv, OutletDiv} from "@assets/css/menu.tsx";
import LoginComponent from '@components/member/login/LoginComponent.tsx';

const Login = () => {
  return (
      <IncludeInformationDiv $top={2}>
        <OutletDiv>
            <LoginComponent/>
        </OutletDiv>
      </IncludeInformationDiv>
   );
}

export default Login;
