import { useState, useEffect } from 'react';

import { headers } from '../../utils/headers';
import { UserDataProps } from '../../props/UserDataProps';

const checkIfLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDataProps | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/user/profile`,
        {
          method: 'GET',
          headers
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
