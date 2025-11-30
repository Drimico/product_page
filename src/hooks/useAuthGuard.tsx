import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuthGuard = () => {
  const authPages = ['/', '/create'];
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token && authPages.includes(window.location.pathname)) {
      navigate('/login');
    }
  }, [window.location.pathname]);
  return null;
};

export default useAuthGuard;
