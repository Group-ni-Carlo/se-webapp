import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentToken = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_CONNECTION}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );
    const { message, token } = await response.json();
    try {
      if (response.ok) {
        window.alert(message);
        localStorage.setItem(`token`, token);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        window.alert(message);
      }
    } catch (err) {
      console.log('Failed to log in', err);
      window.alert(message);
    }
  };

  return (
    <Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 primary ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className=" title text-5xl mt-6 text-center font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary-300
                   placeholder-neutral-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary-700
                   focus:border-secondary-300 focus:z-10 sm:text-sm"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-secondary-300
                   placeholder-neutral-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary-700
                    focus:border-secondary-300 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="body text-sm">
                <a
                  href="#"
                  className="font-medium text-secondary-500 hover:text-primary-700"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="body text-sm">
                <Link
                  to="/register"
                  className="font-medium text-secondary-500 hover:text-primary-700"
                >
                  Don't have an account?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent body text-sm font-medium rounded-md 
                text-shade-light bg-secondary-700 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-700"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
