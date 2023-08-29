import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from 'axios'


const Register = () =>{
    const navigate= useNavigate();
    
    const[userClient,setUserClient]=useState({
        login:"",
        password:"",
        email:"",
        tel:"",
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange =(e) => {
        setUserClient((prev) => ({...prev,[e.target.name]:e.target.value }));
    };

    const handleClick= async e=>{
        e.preventDefault()
        try {
            const response=await axios.post(process.env.REACT_APP_SERVER+"/ActuCrudSeq/inscription",userClient);
            if (response.data.code === 200) {
                setErrorMessage('');
                //navigate("/");
            } else {
                setErrorMessage(response.data.erreur);
                //alert(response.data.erreur);
            }
            
        } catch (error) {
            console.log(error)            
        }
    };
    

    return (
        <div>
            <div className="top-bar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <i className="fa fa-envelope"></i>
                            support@email.com
                        </div>
                        <div className="col-sm-6">
                            <i className="fa fa-phone-alt"></i>
                            +012-345-6789
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="nav">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                        <a href="#" className="navbar-brand">MENU</a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto">
                                <a className="nav-item nav-link active"><Link to="/" >Home</Link></a>
                                <a href="product-list.html" className="nav-item nav-link"><Link to="/listeProduit" >Products</Link></a>
                                <a href="product-detail.html" className="nav-item nav-link">Product Detail</a>
                                <a className="nav-item nav-link"><Link to="/cart" >Cart</Link></a>
                                <a href="checkout.html" className="nav-item nav-link">Checkout</a>
                                <a href="my-account.html" className="nav-item nav-link">My Account</a>
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">More Pages</a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item"><Link to="/register" >Login & Register</Link></a>
                                        <a href="contact.html" className="dropdown-item">Contact Us</a>
                                    </div>
                                </div>
                            </div>
                            <div className="navbar-nav ml-auto">
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">User Account</a>
                                    <div className="dropdown-menu">
                                        <a href="#" className="dropdown-item">Login</a>
                                        <a href="#" className="dropdown-item">Register</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            
            <div className="bottom-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="logo">
                                <a href="index.html">
                                    <img src="img/logo.png" alt="Logo"/>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="search">
                                <input type="text" placeholder="Search"/>
                                <button><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="user">
                                
                                <a href="cart.html" className="btn cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>(0)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Products</a></li>
                        <li className="breadcrumb-item active">Login & Register</li>
                    </ul>
                </div>
            </div>
            
            <div className="login">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Login</label>
                                    <input className="form-control" type="text" placeholder="Login" onChange={handleChange} name="login" />
                                </div>
                                <div className="col-md-6">
                                    <label>Password</label>
                                    <input className="form-control" type="password" placeholder="Password" onChange={handleChange} name="password" />
                                </div>

                                <div className="col-md-6">
                                    <label>E-mail</label>
                                    <input className="form-control" type="text" placeholder="E-mail" onChange={handleChange} name="email" />
                                </div>
                                <div className="col-md-6">
                                    <label>Mobile No</label>
                                    <input className="form-control" type="text" placeholder="Mobile No" onChange={handleChange} name="tel" />
                                </div>
                                {errorMessage && <b><p className="error-message" style={{color:'red'}}>{errorMessage}</p></b>}
                                <div className="col-md-12">
                                    <button className="btn" onClick={handleClick}>Submit</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        
            
        
            
        

        </div>
    )
}

export default Register