import React, { useEffect } from 'react';

const App: React.FC = () => {
  let loggedIn = false;
  const getStatus = async () => {
    const res = await fetch('/me');
    const data = await res.json();
    loggedIn = data.status;
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1>Home Page</h1>
      {loggedIn ? <h1>You are logged in</h1> : <h1>You are not logged in.</h1>}
    </div>
  );
};

export default App;
