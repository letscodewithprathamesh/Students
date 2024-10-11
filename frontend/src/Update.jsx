import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate,  useParams } from 'react-router-dom';
import axios from 'axios';

function Update() 
{
    const {id}=useParams();

    const navigate=useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:8088/read/'+id)
        .then(res=>{
            console.log(res)
            setValues({...values,name:res.data[0].FName,email:res.data[0].Email})
        })
        .catch(err=>console.log(err))
    },[])

    const [values,setValues]=useState({
        name:'',
        email:''
    })

    const handleUpdate=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:8088/update/'+id,values)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err=>{console.log(err)})
    }




    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name"  className="form-control" value={values.name} onChange={e=>setValues({...values,name:e.target.value})} />
    
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Email"  className="form-control" value={values.email} onChange={e=>setValues({...values,email:e.target.value})} />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>)
}

export default Update