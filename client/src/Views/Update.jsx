import React, { useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import axios from 'axios'

const Update = () =>{
    const[listes,setListe]=useState({
        titre:"",
        article:"",
        statut:null,
    });

    const navigate= useNavigate();
    const location= useLocation();
    const idUp=location.pathname.split("/")[2]

    const handleChange =(e) => {
        setListe((prev) => ({...prev,[e.target.name]:e.target.value }));
    };

    const handleUpdate= async e=>{
        e.prevenDefault()
        try {
            await axios.put(process.env.REACT_APP_SERVER+"/ActuCrud/updateBase/"+idUp,listes)
            navigate("/")
        } catch (error) {
            console.log(error)            
        }
    };

    return (
        <div className='form'>
            <h1>Update</h1>
            <input type="text" placeholder='titre' onChange={handleChange} name="titre" />
            <input type="text" placeholder='article' onChange={handleChange} name="article" />
            <input type="number" placeholder='statut' onChange={handleChange} name="statut" />

            <button className="formButton" onClick={handleUpdate}>Update</button>
        </div>
    )
}

export default Update