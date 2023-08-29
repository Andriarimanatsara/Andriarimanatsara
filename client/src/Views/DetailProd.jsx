import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useLocation, useNavigate} from "react-router-dom"
import axios from 'axios'
import Slider from "react-slick";

///////////////////\\\\\\\\\\\\\\\\\\\\\\\
const ListeProduit = () => {
    const navigate= useNavigate();
    const location= useLocation();
    const [listes, setListes] = useState([]);
    const [modifieds, setModifieds] = useState([]);
    const idProd=location.pathname.split("/")[2]

    useEffect(()=>{
        const fetchAllListe=async()=>{
            try {
                const res=await axios.get(process.env.REACT_APP_SERVER+"/ActuCrud/listesDescri/"+idProd)
                setListes(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllListe()
    },[]);

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity <= 0) {
            newQuantity = 1;
        }
        const updatedListe = listes.map((item) =>
            item.id === id ? { ...item, quantite: newQuantity } : { ...item }
        );
        const updatedmodif = listes.map((item) =>
            item.id === id ? { ...item, quantite: newQuantity,prixUnitaire:newQuantity*item.prixUnitaire } : { ...item }
        );
        setListes(updatedListe);

        if (newQuantity > 1) {
            const modified = updatedmodif.find((item) => item.id === id);
            if (modified) {
                setModifieds([...modifieds, modified]);
            }
            console.log(modified)
        }
    };

    const handleClickIndex= async(id,prixUnitaire,photo,nomProduit,quantite)=>{
        
        try {
            const articlePanier = { id, prixUnitaire,photo,nomProduit,quantite };
            const panierExistants = JSON.parse(localStorage.getItem("panier")) || [];
            localStorage.setItem("panier", JSON.stringify([...panierExistants, articlePanier]));
            navigate("/cart")
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
                                <a href="product-detail.html" className="nav-item nav-link"><Link to="/listeProdAdmin" >Prod Admin</Link></a>
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
                        <li className="breadcrumb-item active">Product Detail</li>
                    </ul>
                </div>
            </div>
            <div className="product-detail">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="product-detail-top">
                                <div className="row align-items-center">
                                    {listes.map(liste=>{const quantite = 1;(
                                        <div>
                                            <div className="col-md-5">
                                                <div className="product-slider-single normal-slider">
                                                    <img src={`/img/${liste.photo}`} alt="Product Image"/>
                                                    
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-7">
                                                <div className="product-content">
                                                    <div className="title"><h2>{liste.nomProduit}</h2></div>
                                                    <div className="price">
                                                        <h4>Price:</h4>
                                                        <p>${liste.prixUnitaire}</p>
                                                    </div>
                                                    <div className="quantity">
                                                        <h4>Quantity:</h4>
                                                        <div className="qty">
                                                            <button className="btn-minus" onClick={() =>handleQuantityChange(liste.id, quantite - 1)}>
                                                                <i className="fa fa-minus"></i>
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={quantite}
                                                                min="0"
                                                                onChange={(e) => {
                                                                const newQuantity = parseInt(e.target.value);
                                                                handleQuantityChange(liste.id, newQuantity);
                                                                }}
                                                            />
                                                            <button
                                                                className="btn-plus"
                                                                onClick={() =>
                                                                handleQuantityChange(liste.id, quantite + 1)
                                                                }
                                                            >
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="action">
                                                        <a className="btn" onClick={()=>handleClickIndex(liste.id,liste.prixUnitaire,liste.photo,liste.nomProduit,quantite)}><i className="fa fa-shopping-cart"></i>Add to Cart</a>
                                                        <a className="btn" onClick={()=>handleClickIndex(liste.id,liste.prixUnitaire,liste.photo,liste.nomProduit,quantite)}><i className="fa fa-shopping-bag"></i>Buy Now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )})}
                                    
                                </div>
                            </div>
                            
                            <div className="row product-detail-bottom">
                                <div className="col-lg-12">
                                    <ul className="nav nav-pills nav-justified">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="pill" href="#description">Description</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="pill" href="#specification">Specification</a>
                                        </li>
                                        
                                    </ul>

                                    <div className="tab-content">
                                        <div id="description" className="container tab-pane active">
                                            <h4>Product description</h4>
                                            {listes.map(liste=>(
                                                <div>
                                                    <p>
                                                        {liste.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div id="specification" className="container tab-pane fade">
                                            <h4>Product specification</h4>
                                            <ul>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                                <li>Lorem ipsum dolor sit amet</li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2>Get in Touch</h2>
                                <div className="contact-info">
                                    <p><i className="fa fa-map-marker"></i>123 E Store, Los Angeles, USA</p>
                                    <p><i className="fa fa-envelope"></i>email@example.com</p>
                                    <p><i className="fa fa-phone"></i>+123-456-7890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default ListeProduit