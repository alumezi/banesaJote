import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import Nav from '../components/clientView/nav';
import { FilterBar } from '../components/clientView/filterBar';
import { getUser, createProperty, login, logout } from '../services/api';
import { MainBody } from '../components/clientView/body';
import { LoginComponent } from '../components/login';
import { RegisterComponent } from '../components/register';
import { PostComponent } from '../components/post';
import { IFilter, IProperty, IUser } from '../types';
import { useLocalStorageState } from '../util';
import { fetchFilters, fetchProperties } from '../actions';
import './App.css';

interface StateProperties {
  items: IProperty[];
  isFetching: boolean;
}

interface StateFilters {
  items: Record<string, IFilter[]>;
  isFetching: boolean;
}

interface RootState {
  properties: StateProperties;
  filters: StateFilters;
}

export function App() {
  const { filters, properties } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [localStorageUser, setLocalStorageUser] = useLocalStorageState('user');
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProperties());
      dispatch(fetchFilters());

      const userFromAPI = await getUser();

      setUser(userFromAPI);
      setisLoading(false);
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

  if (isLoading || filters.isFetching || properties.isFetching) {
    return (
      <ReactLoading
        height={'30%'}
        width={'30%'}
        className="react-loading"
        color="#28A745"
        type="bubbles"
      />
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Nav loggedIn={Boolean(user!.id)} logOut={logOut} />
        <FilterBar data={filters.items} />
        <MainBody properties={properties.items} />
      </Route>
      <Route path="/login">
        <LoginComponent submit={submitLogin} />
      </Route>
      <Route path="/post">
        <Nav loggedIn={Boolean(user!.id)} logOut={logOut} />
        <PostComponent
          filterData={filters.items}
          properties={properties.items}
          handleCreatePropertySubmit={handleCreatePropertySubmit}
        />
      </Route>
      <Route path="/signup">
        <RegisterComponent submit={submitSignUp} />
      </Route>
    </Switch>
  );
}
