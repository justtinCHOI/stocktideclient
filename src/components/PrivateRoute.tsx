import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useCustomMember from '@hooks/useCustomMember';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const {isLogin, doLogout} = useCustomMember();


  if (!isLogin) {
    doLogout();
    return <Navigate to="/member/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;