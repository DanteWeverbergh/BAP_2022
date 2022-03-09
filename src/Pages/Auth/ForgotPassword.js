import React, { useState } from 'react';
import { useAuthContext } from '../../Context/AuthContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const { forgotPassword } = useAuthContext();

  const forgot = () => {
    if (email) {
      forgotPassword(email);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center mb-6">Forgot password</h1>
        <div>
          <form className="ml-12 mr-12" onSubmit={forgot} method="POST">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                type={'email'}
                placeholder="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6`}
            >
              Send email
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
