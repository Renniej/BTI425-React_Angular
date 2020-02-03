import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './App.css';

class CreateCar extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { 
    
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

  url = "https://blooming-reaches-31511.herokuapp.com/api/cars";

  handleChange(e) {
    // https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
    // Bottom line, new ES6 feature, bracket notation, computed property names
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
    this.setState({ [e.target.name]: e.target.value });
    //console.log(`Name: ${this.state.name}, Job: ${this.state.job}`);

    // Can also do data validation in here
  }

  componentDidMount() {
    this.input.focus();
  }

  handleSubmit(e) {

    // Turn off default form handling
    //e.preventDefault()

    const newCar = 
    {
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
      Car_Purchaser_Photo: this.state.Purchaser_Photo
    };

    

    fetch(this.url, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(newCar)
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
        this.props.history.push(`/cars/detail/${responseData._id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = 'Add car';

    // Determine the button state
    const isDisabled = this.state.Brand.length === 0 || this.state.Model.length === 0  
                      || this.state.Year <= 0 || this.state.MSRP <= 0 
                      || this.state.VIN.length === 0 ;

    return (
      <div>
        <h4>Add a new car</h4>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="form-horizontal">
          <p>Enter new user data, and click/tap the Add User button</p>
          <hr />

          <div className="form-group">
            <label htmlFor="Brand" className='control-label col-md-2'>Brand</label>
            <div className="col-md-6">
              <input name="Brand" className="form-control" ref={(i) => { this.input = i; }} onChange={this.handleChange} />
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
              <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Add Car</button>&nbsp;&nbsp;
              <Link className='btn btn-default' to='/cars'>Cancel</Link>

            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

export default withRouter(CreateCar);
