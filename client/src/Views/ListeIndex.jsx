import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListeIndex = () =>{
    const[listes,setListe]=useState([])
    const[listeCat,setListeCat]=useState([])

    useEffect(()=>{
        const fetchAllListe=async()=>{
            try {
                const res=await axios.get(process.env.REACT_APP_SERVER+"/ActuCrud/listes")
                setListe(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllListe()
    },[]);

    useEffect(()=>{
        const fetchAllListe=async()=>{
            try {
                const res=await axios.get(process.env.REACT_APP_SERVER+"/ActuCrud/listesCat")
                setListeCat(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllListe()
    },[]);

///////////////update\\\\\\\\\\\\\\\\\\\
    const navigate= useNavigate();

    const handleClickIndex= async(id,prixUnitaire,photo,nomProduit)=>{
        
        try {
            //await axios.get(process.env.REACT_APP_SERVER+"/ActuCrud/addPanier/"+id+"/"+prixUnitaire)

            const quantite=1;
            const articlePanier = { id, prixUnitaire,photo,nomProduit,quantite };
            const panierExistants = JSON.parse(localStorage.getItem("panier")) || [];
            localStorage.setItem("panier", JSON.stringify([...panierExistants, articlePanier]));

            navigate("/cart")
        } catch (error) {
            console.log(error)            
        }
    };
//////////////////// \\\\\\\\\\\\\\\\\\\\\

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true, // Activer l'autoplay
        autoplaySpeed: 3000, // Définir le délai entre les transitions automatiques (en millisecondes)
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="listeIndex">
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
            
            
            
            <div className="featured-product product">
                <div className="container-fluid">
                    <div className="section-header">
                        <h1>Featured Product</h1>
                    </div>
                    
                    
                        <Slider {...settings}>
                            {listes.map(liste=>(
                                <div>
                                    <div className="product-item" style={{ margin: '5%' }} key={liste.id}>
                                        <div className="product-title">
                                            <a href="#">{liste.nomProduit}</a>
                                        </div>
                                        <div className="product-image">
                                            <a href="product-detail.html">
                                                <img src={`/img/${liste.photo}`} alt="Product Image"/>
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                            </div>
                                        </div>
                                        <div class="product-price">
                                            <h3><span>$</span>{liste.prixUnitaire}</h3>
                                            <a class="btn" onClick={()=>handleClickIndex(liste.id,liste.prixUnitaire,liste.photo,liste.nomProduit)}><i class="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    
                            
                        </Slider>
                    
                    
                </div>
            </div>

            <div className="recent-product product">
                <div className="container-fluid">
                    <div className="section-header">
                        <h1>Recent Product</h1>
                    </div>
                    
                    <Slider {...settings}>
                            {listes.map(liste=>(
                                <div>
                                    <div className="product-item" style={{ margin: '5%' }} key={liste.id}>
                                        <div className="product-title">
                                            <a href="#">{liste.nomProduit}</a>
                                        </div>
                                        <div className="product-image">
                                            <a href="product-detail.html">
                                                <img src={`/img/${liste.photo}`} alt="Product Image"/>
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                            </div>
                                        </div>
                                        <div class="product-price">
                                            <h3><span>$</span>{liste.prixUnitaire}</h3>
                                            <a class="btn" onClick={()=>handleClickIndex(liste.id,liste.prixUnitaire)}><i class="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    
                            
                        </Slider>

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
                    
                    <div className="row payment align-items-center">
                        <div className="col-md-6">
                            <div className="payment-method">
                                <h2>We Accept:</h2>
                                <img src="img/payment-method.png" alt="Payment Method" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="payment-security">
                                <h2>Secured By:</h2>
                                <img src="img/godaddy.svg" alt="Payment Security" />
                                <img src="img/norton.svg" alt="Payment Security" />
                                <img src="img/ssl.svg" alt="Payment Security" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 copyright">
                            <p>Copyright &copy; <a href="https://htmlcodex.com">HTML Codex</a>. All Rights Reserved</p>
                        </div>

                        <div className="col-md-6 template-by">
                            <p>Template By <a href="https://htmlcodex.com">HTML Codex</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>

        </div>
    )
}

export default ListeIndex