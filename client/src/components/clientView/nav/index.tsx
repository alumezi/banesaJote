/* This example requires Tailwind CSS v2.0+ */
import { Popover } from '@headlessui/react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './index.css';
import { UserAvatar } from './user';

export default function Navigation({ loggedIn, logIn, logOut }) {
  return (
    <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link to="/">
          <span className="sr-only">Workflow</span>
          <img
            className="h-4 w-auto sm:h-6"
            src={logo}
            alt="Banesa jote logo"
          />
        </Link>
      </div>
      <div className=" md:flex items-center justify-end md:flex-1 lg:w-0">
        <Link
          to="post"
          className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-br from-banesa-green to-green-400 hover:from-banesa-green hover:to-banesa-green"
        >
          Posto
        </Link>
        {loggedIn ? (
          <UserAvatar logOut={logOut} />
        ) : (
          <Link
            to="login"
            className="mx-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Kyçu
          </Link>
        )}
      </div>
    </div>
  );
}
