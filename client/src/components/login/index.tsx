import { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import logo from '../../assets/logo.png';
import moneyShot from '../../assets/moneyShot.JPG';
import './index.css';

interface LoginValues {
  username: string;
  password: string;
}

export function LoginComponent({
  submit,
}: {
  submit: (username: string, password: string) => void;
}) {
  const fancyBorder = { borderRadius: '50%' };
  const [canSubmit, setCanSubmit] = useState(false);

  const validate = (values: LoginValues) => {
    const errors: { username?: string; password?: string } = {};
    if (!values.username) {
      errors.username = 'I nevojshëm';
    }
    if (!values.password) {
      errors.password = 'I nevojshëm';
    }
    if (Object.keys(errors).length) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember_me: '',
    },
    validate,
    onSubmit: (values) => {
      submit(values.username, values.password);
    },
  });

  return (
    <div className="min-h-screen flex ">
      <div className="w-4/12 p-10">
        <img className="h-8 w-auto" src={logo} alt="Workflow" />
        <div className="flex  flex-col  space-y-8 mt-20 rounded">
          <div>
            <div
              className="mb-4 bg-green-400 h-10 w-10"
              style={fancyBorder}
            ></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Kyçu në llogarinë tënde
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ose{' '}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Krijo llogari të re
              </Link>
            </p>
          </div>
          <a href="/facebook-login">Kycu me facebook</a>
          <form onSubmit={formik.handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <label htmlFor="username" className="text-sm">
                Përdoruesi
              </label>
              <input
                id="user-name"
                name="username"
                type="username"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
                className="rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="default-input-validation">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="mt-3">
              <label className="text-sm" htmlFor="password">
                Fjalëkalimi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
                className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="default-input-validation">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.remember_me}
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Më kujto
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password">Keni harruar fjalëkalimin?</Link>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={!canSubmit}
                data-cansubmit={canSubmit.toString()}
                className="group relative w-full flex justify-center py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-green-600 group-hover:text-green-400 can-submit-icon"
                    aria-hidden="true"
                  />
                </span>
                Kyçu
              </button>
            </div>
          </form>
        </div>
      </div>
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
