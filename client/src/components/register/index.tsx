import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import moneyShot from '../../assets/moneyShot.JPG';
import { ErrorBoundary } from '../errorBoundary';

type SubmitProp = (
  fullname: string,
  username: string,
  password: string,
  confirmPassword: string
) => void;

export function RegisterComponent({ submit }: { submit: SubmitProp }) {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const fancyBorder = { borderRadius: '50%' };

  return (
    <div className="min-h-screen flex ">
      <ErrorBoundary>
        <div className="w-4/12 p-10">
          <img className="h-8 w-auto" src={logo} alt="Workflow" />
          <div className="flex  flex-col  space-y-8 mt-20 rounded">
            <div>
              <div className="mb-4 bg-green-400 h-10 w-10" style={fancyBorder}>
                {' '}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Krijoni llogari të re
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ose{' '}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Kyçu në llogarinë tënde
                </Link>
              </p>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                submit(fullname, username, password, confirmpassword);
              }}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div>
                <label htmlFor="fullname" className="text-sm">
                  Emri
                </label>
                <input
                  id="full-name"
                  name="fullname"
                  type="fullname"
                  placeholder="Vendosni emrin tuaj të plotë"
                  autoComplete="fullname"
                  onChange={(event) => setFullname(event.target.value)}
                  required
                  className="rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="mt-3">
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="username"
                  placeholder="Vendosni emrin tuaj të përdoruesit"
                  autoComplete="username"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="mt-3">
                <label className="text-sm" htmlFor="password">
                  Fjalëkalimi
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Vendosni fjalëkalimin tuaj"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="mt-3">
                <label className="text-sm" htmlFor="password">
                  Fjalëkalimi
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Konfirmoni fjalëkalimin tuaj"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Regjistrohu
                </button>
              </div>
            </form>
          </div>
        </div>
      </ErrorBoundary>
      <div className="w-8/12 h-full h-screen">
        <img
          src={moneyShot}
          className="w-full h-full object-cover"
          alt="Prishtina"
        />
      </div>
    </div>
  );
}
