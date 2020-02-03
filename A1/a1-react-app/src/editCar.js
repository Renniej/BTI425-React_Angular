import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import CarDetails from "./GetOneCars";
import './App.css';

class carEdit extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties 

  count = 0;
  testpass = 2;

  state = { car: {},  httpStatusCode: 0, httpStatusOk: false ,

  Brand: '',
  Model: '', 
  Year : 0, 
  MSPRP: 0, 
  VIN: '', 
  Car_Photo : '',

  Purchaser_Name : null,
  Purchaser_Email : null,
  Purchaser_Price : null,
  Purchaser_Photo : null,
  Purchaser_Date : null};

  url = `http://localhost:8080/api/cars/${this.props.id}`;

  handleChange(e) {
    // Same as the "add one" use case
    this.setState({ [e.target.name]: e.target.value });

    // Can also do data validation in here
  }

  componentDidMount() {

    // Get one
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
    // For coding convenience
    const newcar = { 
      _id: this.props.id,
    Car_Brand: this.state.Brand,
    Car_Model: this.state.Model,
    Car_Year: this.state.Year,
    Car_VIN: this.state.VIN,
    CAR_MSRP: this.state.MSRP,
    Car_Photo: this.state.Car_Photo,

    Car_Purchaser_Name: this.state.Purchaser_Name,
    Car_Purchase_Date:  this.state.Purchaser_Date,
    Car_Purachaser_Email: this.state.Purchaser_Email,
    Car_Purchaser_Price: this.state.Purchaser_Price,
    Car_Purchaser_Photo: this.state.Purchaser_Photo}

    // Edit existing
    fetch(this.url, {
      method: 'PUT',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(newcar)
    })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object
        // Study the shape of the data in the reqres.in service
        // Optional...
        console.log(responseData);
        // The identifier "id" can be used to redirect
        this.props.history.push(`/cars/detail/${this.props.id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {

  
    document.title = `car ${this.props.id} edit`;


    // Determine the button state
     const isDisabled = this.state.Brand.length === 0 || this.state.Model.length === 0  
                      || this.state.Year <= 0 || this.state.MSRP <= 0 
                      || this.state.VIN.length === 0 ;

    // For coding convenience, create a shortcut object
    const car = this.state.car;

    // // If "this.input" exists (it will only get rendered if a form exists), set its focus
    // if (this.input && this.state.name.length === 0 && this.state.job.length === 0) {
    //   this.input.focus();
    // }
  

    return (
      
      <div>
      
        <h4>Edit car {car.Car_Model} {car.last_name} from the reqres.in service</h4>

        {this.state.httpStatusOk ? (
          <div className="form-horizontal">
            <p>Edit car data, and click/tap the Save button</p>
            <hr />


            <div className="form-group">
            <label htmlFor="Brand" className='control-label col-md-2'>Brand</label>
            <div className="col-md-6">
              <input name="Brand" className="form-control" {...(this.count == 2 ? {value : car.Car_Model } : {})} ref={(i) => { this.input = i; }} onChange={this.handleChange} />
            </div>
          </div>
        
          <div className="form-group">
            <label htmlFor="Model" className='control-label col-md-2'>Model</label>
            <div className="col-md-6">
              <input name="Model" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Year" className='control-label col-md-2'>Year</label>
            <div className="col-md-6">
              <input name="Year" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

          
          <div className="form-group">
            <label htmlFor="MSRP" className='control-label col-md-2'>MSRP</label>
            <div className="col-md-6">
              <input name="MSRP" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="VIN" className='control-label col-md-2'>VIN</label>
            <div className="col-md-6">
              <input name="VIN" className="form-control" onChange={this.handleChange} />
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="Car_Photo" className='control-label col-md-2'>Car Photo</label>
            <div className="col-md-6">
              <input name="Car_Photo" className="form-control" onChange={this.handleChange} />
            </div>
          </div>



          <div className="form-group">
            <label htmlFor="Purchaser_Name" className='control-label col-md-2'>Purchaser Name</label>
            <div className="col-md-6">
              <input name="Purchaser_Name" className="form-control" onChange={this.handleChange} />
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="Purchaser_Email" className='control-label col-md-2'>Purchaser Email</label>
            <div className="col-md-6">
              <input name="Purchaser_Email" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Purchaser_Price" className='control-label col-md-2'>Purchaser Price</label>
            <div className="col-md-6">
              <input name="Purchaser_Price" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Purchaser_Photo" className='control-label col-md-2'>Purchaser Photo</label>
            <div className="col-md-6">
              <input name="Purchaser_Photo" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Purchaser_Date" className='control-label col-md-2'>Purchase Date</label>
            <div className="col-md-6">
              <input name="Purchaser_Date" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
         


            <div className="form-group">
              <div className="col-md-offset-2 col-md-6">
                <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                <Link className='btn btn-default' to='/cars'>Cancel</Link>
              </div>
            </div>
          </div>

        ) : (
            <div>
              <p>Requested car with identifier {this.props.id} was not found</p>
              <hr />
              <p><Link className='btn btn-default' to='/cars'>Show list of cars</Link></p>
            </div>
          )}

      </div>
    );
  }
}

export default withRouter(carEdit);
