import React, {Component} from "react";
import axios from "axios";
import Config from "../../config";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from "jsonwebtoken";


class ChangeCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: '',            
        };
    }

    async componentDidMount() {
      const { id } = this.props.match.params
    
        await axios.get(`http://localhost:3000/api/orders/clientportal/${id}`, {
            
        }).then(response => {
            let data = response.data
           // console.log(data)
            this.setState({count: data.count});
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

    updateCount(user) {

        const { id } = this.props.match.params

        axios.put(`http://localhost:3000/api/orders/clientportal/${id}`, {
            count: user.count

        }).then(response => {
            toast.success('Count Updated successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.props.history.push('/');

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

    render() {
        return (
          <div>

          </div>           
        );
    }

}

export default ChangeCount;