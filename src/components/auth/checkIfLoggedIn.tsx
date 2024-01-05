import { useState, useEffect } from 'react';

interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  type: string;
}

const checkIfLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/user/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const { userInfo } = await res.json();

      if (!userInfo) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setUser(userInfo);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);
  return { user, isLoggedIn, loading };
};

export default checkIfLoggedIn;
