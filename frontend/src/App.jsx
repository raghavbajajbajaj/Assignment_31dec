import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppointmentScheduler from './components/AppointmentScheduler';
import HomePage from './pages/index';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/schedule" component={AppointmentScheduler} />
      </Switch>
    </Router>
  );
};

export default App;