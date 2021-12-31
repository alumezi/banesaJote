import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import Nav from '../components/clientView/nav';
import { FilterBar } from '../components/clientView/filterBar';
import { getUser, createProperty, login, logout } from '../services/api';
import { MainBody } from '../components/clientView/body';
import { LoginComponent } from '../components/login';
import { RegisterComponent } from '../components/register';
import { PostComponent } from '../components/post';
import { IProperty, IUser, RootState } from '../types';
import { useLocalStorageState } from '../util';
import { fetchFilters, fetchProperties } from '../actions';
import './App.css';

export function App() {
  const { filters, properties } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState<IUser | null>(null);
  const [localStorageUser, setLocalStorageUser] = useLocalStorageState('user');
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProperties());
      dispatch(fetchFilters());

      const userFromAPI = await getUser();

      setUser(userFromAPI);
    };
    fetchData();
  }, [dispatch]);

  const submitLogin = async (username: string, password: string) => {
    const user = await login(username, password);
    setUser(user);
    setLocalStorageUser(user);
    history.push('/main');
  };

  const submitSignUp = async (
    name: string,
    username: string,
    password: string,
    confirmpassword: string
  ) => {
    if (password !== confirmpassword) {
      return alert('Fjalekalimi nuk eshte i njejte');
    }
    // const user = await signup(username, name, password);
    // setLocalStorageUser(user);
    history.push('/login');
  };

  const handleCreatePropertySubmit = async (values: IProperty) => {
    const freshProperty = await createProperty(values);
    // setProperties([freshProperty, ...properties]);
  };

  const logOut = async () => {
    await logout();
    setUser(null);
    setLocalStorageUser(null);
  };

  return (
    <Switch>
      <Route path="/" exact>
        <Nav logOut={logOut} />
        <FilterBar />
        <MainBody />
      </Route>
      <Route path="/login">
        <LoginComponent submit={submitLogin} />
      </Route>
      <Route path="/post">
        <Nav logOut={logOut} />
        <PostComponent
          filterData={filters.items}
          handleCreatePropertySubmit={handleCreatePropertySubmit}
        />
      </Route>
      <Route path="/signup">
        <RegisterComponent submit={submitSignUp} />
      </Route>
    </Switch>
  );
}
