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

export function App() {
  const [user, setUser] = useState();
  const [filterData, setFilterData] = useState({});
  const [properties, setProperties] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const history = useHistory();
  useEffect(() => fetchData(), []);

  const fetchData = async () => {
    const userFromAPI = await getUser();
    const allFilterData = await getFilters();
    setUser(userFromAPI);

    const filterDataReady = {};
    allFilterData.forEach((element) => {
      filterDataReady[element.name] = element.filters;
    });
    setFilterData(filterDataReady);

    const properties = await getProperties();

    setProperties(properties);
    setisLoading(false);
  };

  const submitLogin = async (username, password) => {
    const user = await login(username, password);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/main');
  };

  const submitSignUp = async (name, username, password, confirmpassword) => {
    if (password !== confirmpassword) {
      return alert('Fjalekalimi nuk eshte i njejte');
    }
    // const user = await signup(username, name, password);
    // localStorage.setItem("user", JSON.stringify(user));
    history.push('/login');
  };

  const handleCreatePropertySubmit = async (values) => {
    const freshProperty = await createProperty(values);
    setProperties([freshProperty, ...properties]);
  };

  const logOut = async () => {
    await logout();
    setUser({});
    localStorage.removeItem('user');
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
        <Nav loggedIn={Boolean(user.id)} logOut={logOut} />
        <FilterBar data={filterData} />
        <MainBody properties={properties} />
      </Route>
      <Route path="/login">
        <LoginComponent submit={submitLogin} />
      </Route>
      <Route path="/post">
        <Nav loggedIn={Boolean(user.id)} logOut={logOut} />
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
