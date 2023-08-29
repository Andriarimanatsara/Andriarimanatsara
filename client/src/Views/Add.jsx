import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'

const Add = () =>{
    const navigate= useNavigate();

    const[listes,setListe]=useState({
        titre:"",
        article:"",
        statut:null,
    });

    const handleChange =(e) => {
        setListe((prev) => ({...prev,[e.target.name]:e.target.value }));
    };

    const handleClick= async e=>{
        e.preventDefault()
        try {
            await axios.post(process.env.REACT_APP_SERVER+"/ActuCrud/addBase",listes)
            navigate("/")
        } catch (error) {
            console.log(error)            
        }
    };

    return (
        <div className='form'>
            <h1></h1>
            <input type="text" placeholder='titre' onChange={handleChange} name="titre" />
            <input type="text" placeholder='article' onChange={handleChange} name="article" />
            <input type="number" placeholder='statut' onChange={handleChange} name="statut" />

            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    )
}

export default Add