import React, { Component } from "react";
import {withRouter} from 'react-router';
import axios from "axios";

export default class UserPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        total:'',
        cartItems:[]        
    };
}
  render() {
      return (
       
        <div className="card">
        <div className="card-body">
            <h4 className="header-title mb-3">Order List</h4>

           <div className="table-responsive project-list">
                <table className="table project-table table-centered table-nowrap">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item ID</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Count</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.cartItems.map((item,i) => (

                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}{item.currencySymbol}</td>
                            <td>{item.count}</td>
                            
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
      );
    }

    async componentDidMount() {
      const { id } = this.props.match.params

        await axios.get(`http://localhost:3000/api/orders/clientportal/${id}`, {
            
        }).then(response => {
            let data = response.data
           // console.log(data)
            this.setState({name: data.name,total: data.total,cartItems:data.cartItems});
        })
            .catch(err => {
                if (err.response) {
                    let error = err.response
                    this.setState({isError: true, errorMsg: error.data.msg})
                    console.log(err.response)
                } else  {
                    // client never received a response, or request never left
                }
            })
  }

  }
