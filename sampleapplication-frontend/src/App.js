import './App.css';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link } from "react-router-dom";
import { Component } from 'react';

import AddMail from "./components/add-mails.component";
import Mail from "./components/mails.component";
import MailsList from "./components/mails-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/mails"} className="navbar-brand">
            Mails System
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/mails"} className="nav-link">
                Mails
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/mails"]} component={MailsList} />
            <Route exact path="/add" component={AddMail} />
            <Route path="/mails/:id" component={Mail} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
