import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import GoogleLogin from "react-google-login";
import axios from "axios";
import {withRouter} from 'react-router';




class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      showCheckout: false,
      long: '',
      lat: ''     
    };

    this.getLocation = this.getLocation.bind(this);
    this.getCoodinates = this.getCoodinates.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getCoodinates(position) {
    console.log(position)
    this.setState({ lat: position.coords.latitude, long: position.coords.longitude });

    console.log(this.state)
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoodinates);
    } else {
      alert('browser does not support ...')
    }
  }


  handleInput = (e) => {
    
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = async (e) => {

    e.preventDefault();

    const order = {
      name: this.state.name,
      email: this.state.email,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
      long: this.state.long,
      lat: this.state.lat
    };

    this.props.createOrderPost(order);

  };
  closeModal = () => {
    this.props.clearOrder();
  };

  responseSuccessGoogle = (response) => {
    console.log(response);
    let data = {profileObj: response.profileObj}

    let name = data.profileObj.name;
    let email = data.profileObj.email;
    this.setState({name: name, email:email});
    //console.log(data.profileObj.email);

  };

  responseErrorGoogle = (response) => {
    console.log(response);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
            <div className="cart cart-header">
              You have {cartItems.length} in the cart{" "}
            </div>
          )}

        {null && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order </h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div></div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div></div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div></div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div></div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div></div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {{}.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div>
                      <img src={'/uploads/' + item.imagePath} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {item.price} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    }
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        
                        <li>
                        <GoogleLogin
                            clientId="302156694036-4fdehcn3r55dv84nijrtogqbj4movmng.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseSuccessGoogle}
                            onFailure={this.responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                          />
                        </li>
                        <li>
                          <button className="button primary" type="submit">
                            Checkout
                          </button> 
                          <a href=""
                    onClick={() => this.props.history.push(`/client/userportal/${this.props.currentOrderId}`)}
                    >
                    Please Click to Proceed    
                     
                    </a>                        
                        </li>
                      </ul>
                    </form>
                  </div>
                  <img src={"https://maps.googleapis.com/maps/api/staticmap?center=" + this.state.lat + "," + this.state.long + "&zoom=14&size=400x300&sensor=false&markers=color:red%7C" + this.state.lat + "," + this.state.long + "&key=AIzaSyD5LkQwfaKd8SpU10fhMYwNR0F676A_t1g"}  id="map_image"  class="cart"/>


                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter (Cart) ;
