import React, { Component } from "react";
import {withRouter} from 'react-router';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';



export default class UserPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        total:'',
        cartItems:[] 
    };
}

onSubmitHandler()
{

  const { id } = this.props.match.params

  axios.put(`http://localhost:3000/api/orders/clientportal/${id}`, {
      email: this.state.name,
      cartItems : this.state.cartItems 
  }, {
      
  }).then(response => {
      toast.success('Order Confirmed!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
     

  })
      .catch(err => {
          if (err.response) {
              this.setState({isError: true, errorMsg: err.response.data})
              console.log(err.response)
          } else if (err.request) {
              // client never received a response, or request never left
          } else {
              // anything else
          }
      })
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

increase(itemId){
   let item =  this.state.cartItems.findIndex(item => item.id === itemId);
   let c = item.count + 1;
   return (c);
}
decrease(itemId){
    let item =  this.state.cartItems.findIndex(item => item.id === itemId);
    let c = item.count - 1;
   return (c);
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
                        <th scope="col">Change the Count</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.cartItems.map((item,i) => (
                        
                        <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}{item.currencySymbol}</td>
                            <div><td>{ item.count} </td> </div>
                            <td>
                            <div>
                                 <button onClick = {this.increase(item.id)}>- </button>
                                 <button onClick = {this.decrease(item.id)}>+ </button>
                            </div>
                               
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <div></div>
                </table> 
              </div>

        </div>
    </div>
      );
    }



  }
