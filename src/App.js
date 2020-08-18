import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ElementList from './features/ElementList'
import { Upload } from './features/Upload';
import './App.css';


const App = () => (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">Rules Console</span>
        <div id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>
          </div>
      </nav>
      <Switch>
            <Route exact path="/">
              <Upload />
            </Route>
            <Route path="/configureRules">
              <ElementList />
            </Route>
      </Switch>
    </Router>
)

function Home() {
  return (
    <div className="container text-center justify-content-center">    
      <div className="row content">
        <div className="col-sm-12 mt-5"> 
          <h1 className="bd-title text-center">Welcome to Rules Console</h1>
          <p className="lead text-center">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
