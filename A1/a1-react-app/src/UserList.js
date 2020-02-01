import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class carList extends Component {

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
          console.log(response)
          return response.json();
        } else if (response.status === 404) {
          // Not found 
          throw Error('HTTP 404, Not found');
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
        console.log(error)
      });

  }

  render() {
    document.title = 'car list';

    return (
      <div>
        <h4>List of Cars</h4>
        <p><Link className='btn btn-default' to='/cars/create'>Add a new car</Link></p>
        <table className='table table-striped'>
          <TableHeader />
          <TableBody cars={this.state.cars} />
        </table>
      </div>
    );
  }
}

export default carList;

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
        <th>VIN</th>
        <th>MSRP</th>
        <th>Purchaser</th>
        <th>Purchase Date</th>



       
      </tr>
    </thead>
  );
}

// Function component
// Its purpose is to render the HTML table body element
const TableBody = (props) => {

  // Using the array of objects, create a new array of React elements
  let rows = props.cars.map((car, index) => {
   
    return (
      <TableRow car={car} key={car._id} />
    );
  });

  return <tbody>{rows}</tbody>
}

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
      <td>{car.Car_VIN}</td>
      <td>{car.CAR_MSRP}</td>
      <td>{car.Car_Purchase_Name}</td>
    
      <td><img src={car.Car_Photo} alt='' className='imgInTable' /></td>
      <td><Link className='btn btn-default' to={`/cars/detail/${car.id}`}>Details</Link>&nbsp;&nbsp;
            <Link className='btn btn-warning' to={`/cars/edit/${car.id}`}>Edit</Link>&nbsp;&nbsp;
            <Link className='btn btn-danger' to={`/cars/delete/${car.id}`}>Delete</Link></td>
    </tr>
  );
}
