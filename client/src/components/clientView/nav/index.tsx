import { Link } from 'react-router-dom';
import './index.css';
import logo from '../../../assets/logo.png';
import { IUser } from '../../../types';
import { UserAvatar } from './user';
import { ErrorBoundary } from '../../errorBoundary';
import { FacebookIcon } from '../../../lib/components/icons';

export default function Navigation({
  loggedIn,
  logIn,
  logOut,
}: {
  loggedIn?: boolean;
  logIn?: (username: string, password: string) => IUser;
  logOut: () => Promise<void>;
}) {
  return (
    <ErrorBoundary>
      <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10 mx-4">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <span className="sr-only">Header logo</span>
            <img
              className="h-4 w-auto sm:h-6"
              src={logo}
              alt="Banesa jote logo"
            />
          </Link>
        </div>
        <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
          <Link
            data-testid="post_page_button"
            to="post"
            className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-br from-banesa-green to-green-400 hover:from-banesa-green hover:to-banesa-green"
          >
            Posto
          </Link>
          {loggedIn ? (
            <UserAvatar logOut={logOut} />
          ) : (
            <a href="/facebook-login" className="facebook-login">
              <FacebookIcon className="facebook-icon" />{' '}
              <span className="align-middle">Kyçu me facebook</span>
            </a>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
