import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import CarList from "./getCars";
import CarDetails from "./GetOneCars";
import UserEdit from "./editCar";
import CarDelete from "./DeleteCar";
import CreateCar from "./CreateCar";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navbar className="navbar navbar-default" />
        <hr />

        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/cars" render={() => <CarList />} />
          <Route exact path="/cars/create" render={() => <CreateCar />} />
          <Route
            exact
            path="/cars/detail/:id"
            render={props => <CarDetails id={props.match.params.id} />}
          />
          <Route
            exact
            path="/cars/edit/:id"
            render={props => <UserEdit id={props.match.params.id} />}
          />
          <Route
            exact
            path="/cars/delete/:id"
            render={props => <CarDelete id={props.match.params.id} />}
          />
          <Route render={() => <NotFound />} />
        </Switch>

        <p>&nbsp;</p>
        <hr />
        <footer>
          <p>&copy; 2019, personal or organization name</p>
        </footer>
      </div>
    );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className="header">
      <div className="row">
        <h2>App name/title</h2>
        <p>Brief description of the app</p>
      </div>
    </div>
  );
};

// Function component for the navigation bar
const Navbar = () => {
  return (
    <div className="container-fluid navbar-outline">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">
          Home page
        </Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/cars">Find a car</Link>
          </li>
          <li>
            <Link to="/cars/create">Add a user</Link>
          </li>
          <li>
            <Link to="/othercontent">Other content</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Function component for a content area
const Home = () => {
  return (
    <div>
      <p>This is the home page of the app.</p>
      <p>Click or tap an item on the nav menu.</p>
      <p>&nbsp;</p>
    </div>
  );
};

// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
};
