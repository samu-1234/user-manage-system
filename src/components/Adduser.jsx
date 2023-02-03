import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TiUserAdd } from 'react-icons/ti';




function Adduser() {
    const [formData,setFormData]=useState({
        fname:'',
        lname:'',
        location:'',
        pno:'',

    })

    const history = useNavigate();

    const [data, setData] = useState([{}]);
    
    const getUser = async () => {
        await axios.get('http://localhost:4000/posts').then((res) => setData(res.data));
    };
    
    const handleSubmit = async (e) => {
        let response = await axios.post('http://localhost:4000/posts', formData)
        if(response){
            alert("Form Submitted Successfully..")
            history('/details')            
        }else{
            alert("Something went wrong.")
        }
        setFormData({
            
            fname:'',
            lname:'',
            location:'',
            pno:'',
            
        });
        getUser();
    }
    
    
    return (
        <div className='Container justify-content-center'>
            <div className='row'>
                <div className=' col-md-7 container  justify-content-center'>
                    <h1 className='container d-flex justify-content-center'>Add User Form</h1>
                    <div className='container  justify-content-center' >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="fname"
                                placeholder="First Name"
                                value={formData.fname}
                                onChange={(e) => setFormData({ ...formData,fname: e.target.value})}
                                //isInvalid={!!errors.fname}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="lname"
                                placeholder="Last Name"
                                value={formData.lname}
                                onChange={(e) => setFormData({ ...formData,lname: e.target.value})}
                                //isInvalid={!!errors.lname}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData,location: e.target.value})}
                              //  isInvalid={!!errors.location}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="pno"
                                placeholder="Phone Number"
                                value={formData.pno}
                                onChange={(e) => setFormData({ ...formData,pno: e.target.value})}
                                //isInvalid={!!errors.pno}
                            
                            />
                        </Form.Group>

                       
                        <div className='d-flex justify-content-center'>
                            <Button variant="primary" >
                                <TiUserAdd onClick={handleSubmit} color='red'>
                                </TiUserAdd>Add User</Button>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Adduser
