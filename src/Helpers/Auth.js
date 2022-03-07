import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const loggedIn = localStorage.getItem('loggedIn');

  if (loggedIn) {
    const user = { loggedIn: true };
    return user && user.logedIn;
  } else {
    const user = { loggedIn: false };
    return user && user.logedIn;
  }
};

const Auth = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default Auth;
