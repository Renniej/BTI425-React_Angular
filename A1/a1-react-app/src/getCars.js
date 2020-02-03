import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format'
import "./App.css";

class CarList extends Component {
  // Class properties

  state = { cars: [] };

  url = "https://blooming-reaches-31511.herokuapp.com/api/cars";

  componentDidMount() {
    // Get all
    fetch(this.url)
      .then(response => {
        // Optional...
        //this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found
          throw Error("HTTP 404, Not found");
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service

        this.setState({ cars: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = "List of cars";

    return (
      <div>
        <h4>List of cars</h4>
        <p>
          <Link className="btn btn-default" to="/cars/create">
            Add a new Car
          </Link>
        </p>
        <table className="table table-striped">
          <TableHeader />
          <TableBody cars={this.state.cars} />
        </table>
      </div>
    );
  }
}

export default CarList;

// ############################################################
// Most of the following was copied from the react-tania-updated code example
// ############################################################

// Function component, table header
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Brand</th>
        <th>Model</th>
        <th>Year</th>
        <th>MSRP</th>
        <th>VIN</th>
        <th>Photo</th>
        <th>Bought?</th>
      </tr>
    </thead>
  );
};

// Function component
// Its purpose is to render the HTML table body element
const TableBody = props => {
  // Using the array of objects, create a new array of React elements
  let rows = props.cars.map((car, key) => {
    return <TableRow car={car} key={car._id} />;
  });

  return <tbody>{rows}</tbody>;
};

// Function component
// Its purpose is to render a single HTML table row
const TableRow = props => {
  // For coding convenience (below), create a very short variable name
  const car = props.car;
 

  // Alternative declaration syntax...
  //const { car } = this.props;

  // Render the row
  return (
    <tr>
      <td>{car.Car_Brand}</td>
      <td>{car.Car_Model}</td>
      <td>{car.Car_Year}</td>
      <td><NumberFormat value={car.CAR_MSRP} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
      <td>{car.Car_VIN}</td>
      <td>
        <img src={car.Car_Photo} alt="" className="imgInTable" />
      </td>

      <td>{car.Car_Purchaser_Name == null ? "N" : "Y"}</td>

      <td>
        <Link className="btn btn-default" to={`/cars/detail/${car._id}`}>
          Details
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-warning" to={`/cars/edit/${car._id}`}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-danger" to={`/cars/delete/${car._id}`}>
          Delete
        </Link>
      </td>
    </tr>
  );
};
