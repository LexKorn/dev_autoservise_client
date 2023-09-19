import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import UserStore from './store/UserStore';
import ServiceStore from './store/ServiceStore';

import './style/style.sass';

type RootStateContextValue = {
  user: UserStore;
  service: ServiceStore;
};

export const Context = createContext<RootStateContextValue>({} as RootStateContextValue);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    service: new ServiceStore()
  }}>
    <App />
  </Context.Provider>
);