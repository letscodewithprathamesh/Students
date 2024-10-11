import React,{useEffect, useState} from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"


function Read()
{
    const {id}=useParams();
    const [student,setStudent]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:8088/read/'+id)
        .then(res=>{
            console.log(res)
            setStudent(res.data[0])
        })
        .catch(err=>console.log(err))
    },[])

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <div className="p-2">
                <h1>Student Detail</h1>
                <h3>{student.Id}</h3>
                <h3>{student.FName}</h3>
                <h3>{student.Email}</h3>
                </div>
                <Link to="/" className="btn btn-primary">Back</Link>
                <Link to={`/edit/${student.Id}`} className="btn btn-primary">Edit</Link>
            </div>
        </div>
    )
}

export default Read
