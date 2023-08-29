import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Liste = () =>{
    const[listes,setListe]=useState([])

    useEffect(()=>{
        const fetchAllListe=async()=>{
            console.log(process.env.REACT_APP_SERVER)
            try {
                const res=await axios.get(process.env.REACT_APP_SERVER+"/ActuCrud/listes")
                setListe(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllListe()
    },[]);
    const handleDelete =async(id)=>{
        try {
            await axios.delete(process.env.REACT_APP_SERVER+"/ActuCrud/deleteBase/"+id)
            window.location.reload();
        } catch (error) {
           console.log(error) 
        }
    }

    return (
        <div>
            <h1>Liste Actu</h1>
            <div className="listes">
                {listes.map(liste=>(
                    <div className="liste" key={liste.id}>
                        <img src="" alt="" />
                        <h2>{liste.titre}</h2>
                        <p>{liste.article}</p>
                        <button className="delete" onClick={()=>handleDelete(liste.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${liste.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add" >Add new</Link>
            </button>
            <button>
                <Link to="/listeIndex" >Liste Index</Link>
            </button>
            
            <div className="tableau">
                <table class="table table-dark table-striped">
                    <thead>
                        <th>Titre</th>
                        <th>Article</th>
                        <th>Status</th>
                        <th>Action</th>
                    </thead>
                    <div className="listes">
                        {listes.map(liste=>(
                            <tbody>
                        
                                <div className="liste" key={liste.id}>
                                    <tr>
                                        <td>{liste.titre}</td>
                                        <td>{liste.article}</td>
                                        <td>{liste.statut}</td>
                                        <td>
                                            <a href="update/<%= articles.id %>" class="btn btn-sm btn-primary">Edit</a>
                                            <form action="/ActuCrud/deleteBase" method="POST">
                                                <button class="btn btn-sm btn-danger">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                </div>
                            
                            </tbody>
                        ))}
                    </div>
                </table>
            </div>
        </div>
    )
}

export default Liste