import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
function Home()
{

    const [data , setData ] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:8088')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))

    },[])

    const handleDelete=(id)=>{
        axios.delete('http://localhost:8088/delete/'+id)
        .then(res=>{
            console.log(res)
            location.reload();
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>Create +</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student,index)=>{
                            return <tr key={index}>
                                <td>{student.Id}</td>
                                <td>{student.FName}</td>
                                <td>{student.Email}</td>
                                <td>
                                    <Link to={`/read/${student.Id}`} className='btn btn-sm btn-info'>Read</Link>
                                    <Link to={`/edit/${student.Id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button onClick={()=>handleDelete(student.Id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home