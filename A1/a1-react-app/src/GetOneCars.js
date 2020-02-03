import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format'

import "./App.css";

class CarDetail extends Component {
  // Class properties

  state = { car: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://blooming-reaches-31511.herokuapp.com/api/cars/${this.props.id}`;

  componentDidMount() {
    // Get one
    fetch(this.url)
      .then(response => {
        // Optional...
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok
        });
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
        
        this.setState({ car: responseData });
        // Optional...
       
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `${this.props.id}`;

    // For coding convenience, create a shortcut object
    const car = this.state.car;
    
    
    return (
      <div>
        <h4>
          {car.Car_Year} {car.Car_Brand} {car.Car_Model}
        </h4>

        {/* <p>HTTP response status code was {this.state.httpStatusCode}</p> */}

        {this.state.httpStatusOk ? (
          <div className="row">
            <div className="col-md-6">
              <dl className="dl-horizontal">
                <dd><img src={car.Car_Photo} alt="Image not avaliable"  /></dd>
                <dt>Price</dt>
                <dd> <NumberFormat value={car.CAR_MSRP} displayType={'text'} thousandSeparator={true} prefix={'$'} /></dd>

                <dt>VIN</dt>
                <dd>{car.Car_VIN}</dd>

                <dt>Purchaser Photo : </dt>
                <dd> {car.Car_Purchaser_Photo != null ? car.Car_Purchaser_Photo : "None"} </dd>

                
                <dt>Purchaser Name</dt>
                <dd> {car.Purchaser_Name != null ? car.Purchaser_Name : "None"} </dd>

                <dt>Sale Date</dt>
                <dd> {car.Car_Purchase_Date != null ? car.Car_Purchase_Date : "None"} </dd>


                <dt>Sold For</dt>
                <dd> {car.Car_Purchaser_Price != null ? car.Car_Purchaser_Price : "None"} </dd>

                <dd>{car.last_name}</dd>
              </dl>
            </div>
            <div className="col-md-2">
              <img src={car.avatar} alt="" className="img-responsive" />
            </div>
          </div>
        ) : (
          <p>Requested car was not found</p>
        )}

        <hr />
        <p>
          <Link className="btn btn-warning" to={`/cars/edit/${car._id}`}>
            Edit
          </Link>
          &nbsp;&nbsp;
          <Link className="btn btn-default" to="/cars">
            Show list of users
          </Link>
        </p>
      </div>
    );
  }
}

export default CarDetail;
