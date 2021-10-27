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

interface IState {
  user: IUser | null;
  filterData: Record<string, IFilter[]> | {};
  properties: IProperty[] | [];
  loadingState: 'idle' | 'pending' | 'resolved' | 'rejected';
  error?: Error;
}

export function App() {
  const [state, setState] = useState<IState>({
    user: null,
    filterData: {},
    properties: [],
    loadingState: 'idle',
  });
  const [localStorageUser, setLocalStorageUser] = useLocalStorageState('user');
  const history = useHistory();

  const updateState = (
    name: string,
    newStateEntry:
      | IUser
      | Record<string, IFilter[]>
      | IProperty[]
      | string
      | Error
      | null
  ) => {
    setState((state) => {
      return { ...state, [name]: newStateEntry };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateState('loadingState', 'pending');
        const userFromAPI = await getUser();
        const allFilterData = await getFilters();
        console.log(
          '🚀 ~ file: App.tsx ~ line 62 ~ fetchData ~ userFromAPI',
          userFromAPI
        );
        updateState('user', userFromAPI);

        const filterDataReady: Record<string, IFilter[]> = {};
        allFilterData.forEach((element) => {
          filterDataReady[element.name] = element.filters;
        });
        updateState('filterData', filterDataReady);

        const properties = await getProperties();
        updateState('loadingState', 'resolved');
        updateState('properties', properties);
      } catch (err) {
        updateState('loadingState', 'rejected');
        updateState('error', err as Error);
      }
    };
    fetchData();
  }, []);

  const submitLogin = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      updateState('user', user);
      setLocalStorageUser(user);
      history.push('/main');
    } catch (err) {
      updateState('error', err as Error);
    }
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
    try {
      const freshProperty = await createProperty(values);
      updateState('properties', [freshProperty, ...state?.properties]);
    } catch (err) {
      updateState('error', err as Error);
    }
  };

  const logOut = async () => {
    await logout();
    updateState('user', null);
    setLocalStorageUser(null);
  };
  console.log(state);
  if (state.loadingState === 'idle' || state.loadingState === 'pending') {
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
  console.log('here ?');
  console.log(state);
  return (
    <Switch>
      <Route path="/" exact>
        <Nav loggedIn={Boolean(state.user!.id)} logOut={logOut} />
        <FilterBar data={state.filterData} />
        <MainBody properties={state.properties} />
      </Route>
      <Route path="/login">
        <LoginComponent submit={submitLogin} />
      </Route>
      <Route path="/post">
        <Nav loggedIn={Boolean(state.user!.id)} logOut={logOut} />
        <PostComponent
          filterData={state.filterData}
          properties={state.properties}
          handleCreatePropertySubmit={handleCreatePropertySubmit}
        />
      </Route>
      <Route path="/signup">
        <RegisterComponent submit={submitSignUp} />
      </Route>
    </Switch>
  );
}
