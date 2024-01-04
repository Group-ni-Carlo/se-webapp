import { useState, useEffect } from 'react';

const checkIfLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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
      }
      setLoading(false);
    };

    fetchUser();
  }, []);
  return { isLoggedIn, loading };
};

export default checkIfLoggedIn;
