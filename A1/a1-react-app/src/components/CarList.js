import React, { Component } from 'react';


class CarList extends Component{

    url = "https://dashboard.heroku.com/apps/blooming-reaches-31511";
    state = {
        cars : {},
        httpStatusCode : 0,
        httpStatusOk : false
    }


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
              throw Error('HTTP 404, Not found');
            } else {
              // Some other situation
              throw Error(`HTTP ${response.status}, ${response.statusText}`);
            }
          })
          .then(responseData => {
            // "responseData" is an object; here, we're interested in its "data" property
            // Study the shape of the data in the reqres.in service
            this.setState({ users: responseData });
            // Optional...
            //console.log(responseData.data);
          })
          .catch(error => {
            // Handles an error thrown above, as well as network general errors
            console.log(error)
          });
    
      }


      render() {
        document.title = 'User list';
    
        return (
          <div>
            <h4>List of users, from the reqres.in service</h4>
            <p><Link className='btn btn-default' to='/users/create'>Add a new user</Link></p>
            <table className='table table-striped'>
              <TableHeader />
              <TableBody users={this.state.users} />
            </table>
          </div>
        );
      }
    }

}