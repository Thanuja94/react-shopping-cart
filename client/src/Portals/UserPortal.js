import React, { Component } from "react";
import { withRouter } from 'react-router';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';



 class UserPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        total:'',
        cartItems:[] 
    };
}

onSubmitHandler = async() =>
{
  const { id } = this.props.match.params

   await axios.put(`http://localhost:3000/api/orders/clientportal/${id}`, {
     
      cartItems : this.state.cartItems,
      total : this.state.total,
      name : this.state.name

        }).then(
            response => {
                    toast.success('Order updated successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // this.props.history.push('/admin/adminlist');
        
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


increase = (itemId) => {
    let item = this.state.cartItems.find(item => item.id === itemId);
    let index = this.state.cartItems.findIndex(item => item.id === itemId);

    let cartItems = [...this.state.cartItems];    
    item.count += 1;
    cartItems[index] = item;
    
    this.setState({ cartItems });   

    console.log(cartItems[index]); 
    

}
decrease(itemId){
    let item = this.state.cartItems.find(item => item.id === itemId);
    let index = this.state.cartItems.findIndex(item => item.id === itemId);

    let cartItems = [...this.state.cartItems];    
    item.count -= 1;
    cartItems[index] = item;

    this.setState({ cartItems });    

    console.log(cartItems[index]); 
    
}
calTotal(){
    this.setState({total:this.state.cartItems.reduce((a, c) => a + c.price * c.count, 0)})
}

  render() {
      return ( 
           
        <div className="container-fluid">  
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />       
        <div className="card">
        <div className="card-body">
           
           <div>  <span className="label info">Order List</span></div>
            
           
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
                                 <button onClick = {()=>this.increase(item.id)}>+ </button>
                                 <button onClick = {()=>this.decrease(item.id)}>- </button>
                                 
                            </div>
                               
                            </td>
                        </tr>
                    ))}
                    </tbody>                   
                </table> 
              </div>
                <div>               
                <span className="float-right">Click to calculate the Total</span>               
               </div>
              <div>
              <button className="btn btn-warning float-right" onClick = {()=>this.calTotal()}>{this.state.total}</button>              
              </div> 
              <div>
              <button className="btn btn-warning float-right" onClick = {()=>this.onSubmitHandler()}>Confirm</button>  
               </div>   
        </div>
    </div>
    </div>  );
    }
  }
  export default withRouter (UserPortal) ;
