import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route} from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Start from './components/Home/dashboard.jsx';
import Login from './components/login/index.js';
import Signup from './components/sign-up/index.js'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers/index.js';

const store = createStore(
    allReducers
);

injectTapEventPlugin();

export class App extends React.Component {
  render(){
    return(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <HashRouter>
      <Provider store={store}>
          <div>
          <Route path = "/login" component = {Login} />
          <Route path = "/signup" component = {Signup} />
          <Route path = "/user"  component = {Start} />
          </div>
      </Provider>
    </HashRouter>
    </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
