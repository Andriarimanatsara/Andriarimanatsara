import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ListeProduitAdmin = () => {
    const [listes, setListe] = useState([]);
    const[listeCat,setListeCat]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Nombre d'articles par page
    const [totalPages, setTotalPages] = useState(1); // Nombre total de pages

    useEffect(() => {
        const fetchAllListe = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/ActuCrud/listesPg?page=${currentPage}&perPage=${itemsPerPage}`);
                setListe(res.data.data);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllListe();
    }, [currentPage]);

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
    // ... (rest of your code)

    // Generate pagination buttons
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <li class="page-item"><a class="page-link" key={i} onClick={() => handlePageChange(i)} >
                {i}
            </a></li>
        );
    }

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate indices for slicing
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
///////////////////\\\\\\\\\\\\\\\\\\\\\\\


    const navigate= useNavigate();

    const[listesP,setListeP]=useState({
        idActualite:null,
        statut:null,
    });

    const handleChange =(e) => {
        setListeP((prev) => ({...prev,[e.target.name]:e.target.value }));
    };

    

    const handleRemoveItem = async (id) => {
        try {
          // Effectuer une requête pour supprimer l'article du panier
          await axios.delete(`http://localhost:8800/ActuCrud/deletePanier/${id}`);/////////
          // Rafraîchir la liste du panier après la suppression
          //fetchAllListe();
        } catch (error) {
          console.log(error);
        }
    };


    const handleCat= async(idCat)=>{
        try {
            const res=await axios.get(process.env.REACT_APP_SERVER+"/ActuCrud/listesProdCat/"+idCat);
            setListe(res.data);
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
                                <a href="wishlist.html" className="btn wishlist">
                                    <i className="fa fa-heart"></i>
                                    <span>(0)</span>
                                </a>
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
                        <li className="breadcrumb-item active">Product List</li>
                    </ul>
                </div>
            </div>
            <div className="product-view">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                {listes.map((liste) => (
                                    <div key={liste.id}>
                                        <div className="product-item" style={{ margin: '2%'}}>
                                            <div className="product-title">
                                                <a href="#">{liste.nomProduit}</a>
                                            </div>
                                            <div className="product-image">
                                                <a href="product-detail.html">
                                                    <img src={`/img/${liste.photo}`} alt="Product Image" style={{ width: '100%', height: 'auto' }}/>
                                                </a>
                                                
                                            </div>
                                            <div className="product-price">
                                                <h3><span>$</span>{liste.prixUnitaire}</h3>
                                                <a className="btn" style={{ margin: '2%'}}><Link to={`/updateAdmin/${liste.id}`}>Update</Link></a>
                                                <a className="btn" style={{ margin_top:'1%'}} onClick={()=>handleRemoveItem(liste.id)}>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-12">
                                <nav aria-label="Page navigation example">
                                    <div className="pagination">
                                        <ul className="pagination justify-content-center">
                                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                <a className="page-link" onClick={handlePreviousPage} tabIndex="-1">Previous</a>
                                            </li>
                                            {paginationButtons.length}
                                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                <a className="page-link" onClick={handleNextPage}>Next</a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            
                        </div>
                        <div className="col-lg-4 sidebar">
                            <div className="sidebar-widget category">
                                <h2 className="title">Category</h2>
                                <nav className="navbar bg-light">
                                    <ul className="navbar-nav">
                                        {listeCat.map(listeCt=>(
                                            <div key={listeCt.id}>
                                                <li className="nav-item">
                                                    <a className="btn" onClick={()=>handleCat(listeCt.id)}><i className="fa fa-mobile-alt"></i>{listeCt.nomCategorie}</a>
                                                </li>
                                            </div>
                                        ))} 
                                    </ul>
                                </nav>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default ListeProduitAdmin