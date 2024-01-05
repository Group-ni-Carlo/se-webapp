import { useState, useEffect } from 'react';
import { headers } from '../../utils/headers';

const checkIfAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_CONNECTION}/admin`,
        {
          method: 'GET',
          headers
        }
      );
      const { status } = await res.json();

      if (!status) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
      setAdminLoading(false);
    };

    fetchUser();
  }, []);
  return { isAdmin, adminLoading };
};

export default checkIfAdmin;
