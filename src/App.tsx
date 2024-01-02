import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const [logStatus, setLogStatus] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    yearLevel: ''
  });

  const getStatus = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const { status, me } = await res.json();
    setLogStatus(status);
    setUser(me);
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Home Page</h1>
      <Link
        to="/admin"
        className="flex flex-row bg-shade-light hover:bg-neutral-300 active:bg-secondary-100"
      >
        <h1>Admin</h1>
      </Link>
      {logStatus ? (
        <h1>Hello, {user.firstName}</h1>
      ) : (
        <h1>You are not logged in!</h1>
      )}
    </div>
  );
};

export default App;
