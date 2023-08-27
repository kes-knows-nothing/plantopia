import { auth } from '@/utils/firebaseApp';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ?? navigate('/login');
      user && setUser(user);
    });
  }, []);

  return user;
};

export default useAuth;
