import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import CarDetails from "./GetOneCars";
import './App.css';

class UserDelete extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { car: {}, httpStatusCode: 0, httpStatusOk: false };

  url = `https://blooming-reaches-31511.herokuapp.com/api/cars/${this.props.id}`;

  componentDidMount() {

    // Get the requested object
    fetch(this.url)
      .then(response => {
        // Optional...
        this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
        if (response.ok) {
          // Parse the response body as JSON
         
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
        console.log(responseData)
        this.setState({ car: responseData });
        // Optional...
        //console.log(responseData.data);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  handleSubmit(e) {

    // Delete
    fetch(this.url, { method: 'DELETE' })
      .then(response => {
        console.log(response)
        if (response.ok) {
          // Parse the response body as JSON
          
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
        
      })
      .then(responseData => {
        // "responseData" is an integer (probably 204)
        // Study the shape of the data in the reqres.in service
        // Optional...
       
      
      
        // Redirect
        this.props.history.push('/cars');
      })
      .catch(error => {
        
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });
  }

  render() {
    document.title = `Delete ${this.props.id}`;

    // For coding convenience, create a shortcut object
    //const car = this.state.car;

    return (
      <div>
        <h4>Delete Car</h4>

        {this.state.httpStatusOk ? (
          <div>
              <CarDetails id={this.props.id}/>
          </div>

        ) : (
            <p>Requested car was not found</p>
          )}

        <hr />
        <p>Confirm that this car should be deleted, or cancel to return to the list of cars</p>
        <p><button onClick={this.handleSubmit} className="btn btn-danger">Confirm delete</button>&nbsp;&nbsp;
        <Link className='btn btn-default' to='/cars'>Cancel</Link></p>
      </div>
    );
  }
}

export default withRouter(UserDelete);
