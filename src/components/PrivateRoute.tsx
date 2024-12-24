const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { isLogin, moveToPath } = useCustomMember();
  // if (!isLogin) {
  //   moveToPath('/logins');
  //   return
  // }
  return <>{children}</>;
};

export default PrivateRoute;
