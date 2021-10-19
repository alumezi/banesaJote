import { useEffect, useState } from 'react';
import Nav from './components/clientView/nav';
import { FilterBar } from './components/clientView/filterBar';
import {
  getUser,
  getFilters,
  getProperties,
  createProperty,
  login,
  logout,
} from './services/api';
import ReactLoading from 'react-loading';
import './App.css';
import { MainBody } from './components/clientView/body';
import { Switch, Route, useHistory } from 'react-router-dom';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { PostComponent } from './components/post';
import { IFilter, IProperty, IUser } from './types';
import { useLocalStorageState } from './util';

export function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [filterData, setFilterData] = useState<Record<string, IFilter[]>>({});
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [localStorageUser, setLocalStorageUser] = useLocalStorageState('user');
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userFromAPI = await getUser();
    const allFilterData = await getFilters();
    setUser(userFromAPI);

    const filterDataReady: Record<string, IFilter[]> = {};
    allFilterData.forEach((element) => {
      filterDataReady[element.name] = element.filters;
    });
    setFilterData(filterDataReady);

    const properties = await getProperties();

    setProperties(properties);
    setisLoading(false);
  };

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
    setProperties([freshProperty, ...properties]);
  };

  const logOut = async () => {
    await logout();
    setUser(null);
    setLocalStorageUser(null);
  };

  if (isLoading) {
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
        <FilterBar data={filterData} />
        <MainBody properties={properties} />
      </Route>
      <Route path="/login">
        <LoginComponent submit={submitLogin} />
      </Route>
      <Route path="/post">
        <Nav loggedIn={Boolean(user!.id)} logOut={logOut} />
        <PostComponent
          filterData={filterData}
          properties={properties}
          handleCreatePropertySubmit={handleCreatePropertySubmit}
        />
      </Route>
      <Route path="/signup">
        <RegisterComponent submit={submitSignUp} />
      </Route>
    </Switch>
  );
}
