import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Button, Row, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { TiDelete,TiUserAdd } from 'react-icons/ti';

function Details() {
    const history = useNavigate();
    const handleSubmit = () => {
        history("/adduser")
    }

    useEffect(() => {
        getUser();
    }, []);

    const [data, setData] = useState([{}]);
    const getUser = async () => {
        await axios.get('http://localhost:4000/posts').then((res) => setData(res.data));
    };

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:4000/posts/' + id).then((res) => alert("Deleted Succesfully.."));
        getUser();
    }

    const handleEdit = async () => {
        await axios.put(`http://localhost:4000/posts/${updateData.id}`, updateData)
            .then((res) => {
                alert("User Updated Successfully..")
                getUser();
            });
    };

    const [updateData, setUpdateData] = useState({
        fname: '',
        lname: '',
        location: '',
        pno: '',
        id: ''

    })


    return (
        <div >
            <Row>
                <div className='d-flex justify-content-center mt-3'>
                    <Button><TiUserAdd color='red' size='2rem' onClick={handleSubmit}></TiUserAdd>AddUser</Button>
                </div>
            </Row>
            <Row>
                <h3 className='d-flex justify-content-center mt-3'>User Management System Records.</h3>

                <div className='d-flex justify-content-center mt-3'>
                    <div className='d-flex mt-3'>
                        <table class="table">
                            <thead>
                                <tr >
                                    <th scope="col">Id</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {data &&
                                    data.map((user) => (
                                        <tr>
                                            <th scope="row">{user.id}</th>
                                            <td>{user.fname}</td>
                                            <td>{user.lname}</td>
                                            <td>{user.pno}</td>
                                            <td>{user.location}</td>
                                            <td>
                                                <th>
                                                    <text variant='success'>
                                                    <FaUserEdit color='green' size='2rem' variant="info"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        onClick={() => setUpdateData({
                                                            fname: user.fname,
                                                            lname: user.lname,
                                                            location: user.location,
                                                            pno: user.pno,
                                                            id: user.id
                                                        })} />
                                                    </text>
                                                </th>
                                                <th>
                                                    <text variant='denger'>
                                                    <TiDelete color='red' size='2rem'
                                                        onClick={() => handleDelete(user.id)}>
                                                    </TiDelete>
                                                    </text>
                                                    
                                                </th>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Row>
            {/* <!--Model> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Update User</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='container  justify-content-center' >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control
                                        type="fname"
                                        placeholder="First Name"
                                        value={updateData.fname}
                                        onChange={(e) => setUpdateData({ ...updateData, fname: e.target.value })}
                                    //isInvalid={!!errors.fname}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="lname"
                                        placeholder="Last Name"
                                        value={updateData.lname}
                                        onChange={(e) => setUpdateData({ ...updateData, lname: e.target.value })}
                                    //isInvalid={!!errors.lname}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="location"
                                        placeholder="Location"
                                        value={updateData.location}
                                        onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                                    //  isInvalid={!!errors.location}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="pno"
                                        placeholder="Phone Number"
                                        value={updateData.pno}
                                        onChange={(e) => setUpdateData({ ...updateData, pno: e.target.value })}
                                    //isInvalid={!!errors.pno}

                                    />
                                </Form.Group>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                onClick={() => handleEdit()}>Update User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
