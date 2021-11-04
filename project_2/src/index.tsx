import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from './core/Context';
import store from './store';
import { Router } from 'react-router-dom';
import { Splash } from './components';
import history from "./history.js";
import "./.styleguide/main.scss";

//Simulating the previous loading...
const App = lazy(() => {
  return Promise.all([
    import("./components/App"),
    new Promise(resolve => setTimeout(resolve, 1000))
  ]).then(([moduleExports]) => moduleExports);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
