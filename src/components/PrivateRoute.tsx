import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const isLogin = useSelector((state: RootState) => state.loginSlice.email);

  if (!isLogin) {
    return <Navigate to="/member/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;