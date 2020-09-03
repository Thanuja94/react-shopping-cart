import React, {Component} from "react";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    state = {
      paramId :'',
      productName: '',
      price: '',
      qty: '',
      category: '',
      imagePath: null
  };

    handleFileUpload(event) {

        console.log(event.target.files[0])
        this.setState({imagePath: event.target.files[0] });
    }

    async handleInputChange(event) {

        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    async componentDidMount() {
        const {id} = this.props.match.params

        await axios.get(`http://localhost:3000/api/products/${id}`, {
           
        }).then(response => {
          this.setState({isError: false})
          let data = response.data
        //  console.log(data);       

        this.setState({paramId :id,productName:data.name, price:data.price, qty:data.qty ,category:data.category, imagePath:data.imagePath});
          
      }).catch(err => {
              if (err.response) {
                  let error = err.response
                  this.setState({isError: true, errorMsg: error.data.msg})
                  console.log(err.response)
              } else if (err.request) {
                  // client never received a response, or request never left
              } else {
                  // anything else
              }
          })

    }

    async handleUpdate() {        

        let formData = new FormData();
        formData.append('imagePath', this.state.imagePath);
        formData.append('productName', this.state.productName);
        formData.append('qty', this.state.qty);
        formData.append('category', this.state.category);
        formData.append('price', this.state.price);

        let res = await axios.put('http://localhost:3000/api/products/${this.state.id}', formData)
        if (res.status === 200) {
            toast.success('Product updated succesfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                this.props.history.push('/admin/adminlist');
        } else {
            toast.error('Error adding product !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        
    }

    render() {
        return (
            <div className="container">
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
                <br/>
                <br/>
                <div className="d-flex justify-content-center ">
                    <div className="card dark-background" style={{width: "500px"}}>
                        <div className="card-header">
                            <h3>Update Product Details <i className="fa fa-edit"></i></h3>
                            <a href=""
                                    onClick={() => this.props.history.push(`/admin/ProductsListPortal`)}
                                    className="text-success mr-4" data-toggle="tooltip"
                                    data-placement="top" title="" data-original-title="Edit">
                                        <button type="submit" className="btn btn-warning float-right" onClick={this.handleUpdate} >Close</button>                                     
                                   </a> 
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmitHandler}>
                            //    <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-tablet"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.handleInputChange}
                                           name="productName" placeholder="Product Name" value={this.state.productName} required/>

                            //    </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-tablet"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.handleInputChange}
                                           name="price" placeholder="Price" value={this.state.price} required/>

                            //    </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-tablet"></i></span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.handleInputChange}
                                           name="qty" placeholder="Quentity" value={this.state.qty} required/>

                                </div>
                            
                         //   <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Category</span>
                                    </div>
                                            <select  className="form-control" name="category" onChange={this.handleInputChange} required>
                                                <option value="">{this.state.category}</option>
                                                <option value="Mobile phones">Mobile phones</option>
                                                <option value="Laptops" >Laptops</option>
                                                <option value="Accessories" >Accessories</option>
                                                <option value="Smart watches" >Smart watches</option>
                                                <option value="Other" >Other</option>
                                            </select>
                              </div>

                             //   <div className="input-group form-group">
                                    <div className="input-group-prepend">                                        
                                    
                                    <img src={'/uploads/'+this.state.imagePath} alt={this.state.productName} width="60" height="60"></img>                                
                                    
                                    <input type="file" className="form-control-file" id="imagePath" name="imagePath" onChange={this.handleFileUpload} required />
                                    </div>
                                </div>
                             
                            //  <div className="form-group">
                                    <button type="submit" className="btn btn-warning float-right" onClick={this.handleUpdate} >Update</button>                               
                                    
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default EditProduct;