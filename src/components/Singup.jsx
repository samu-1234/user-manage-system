import React, { useState, useEffect } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

function Singup() {

  const history = useNavigate();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null
      })
  }
  const validateForm = () => {
    const { email, username, phoneno, password } = form
    const newErrors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || email === '')
      newErrors.email = 'Please Enter Valid Email.'
    else if (regex === true) newErrors.email = 'Please Enter Valid Email.'
    if (!username || username === ' ') newErrors.username = 'Please Enter Username.'
    if (!phoneno || phoneno === ' ') newErrors.phoneno = 'Please Enter Valid Phone Number.'
    else if (phoneno.length < 10) newErrors.phoneno = 'Please Enter 10 digit Phone Number.'
    if (!password || password === ' ') newErrors.password = 'Please Enter Valid password.'
    else if (password.length < 4) newErrors.password = 'Please Enter at least 4 character.'

    return newErrors

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      fetch("http://localhost:4000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      }).then((res) => {
        alert('Register successfully.')
        console.log(form)
        history('/login');
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }


  return (
    <div>

      <div className='container'>
        <Row className='mb-7'>
          <Form >
            <div className='Container mt-3 d-flex justify-content-center'>Sign Up</div>
            <div className='container'>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control
                  type="email"
                  placeholder="Email*"
                  value={form.email}
                  // onChange = {(e) => console.log('email',e.target.value)}
                  onChange={(e) => setField('email', e.target.value)}
                  isInvalid={!!errors.email}
                />

                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupUername">
                <Form.Control
                  type="username"
                  placeholder="User Name*"
                  value={form.username}
                  onChange={(e) => setField('username', e.target.value)}
                  isInvalid={!!errors.username}

                />
                <Form.Control.Feedback type='invalid'>
                  <p>{errors.username}</p>
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPno">
                <Form.Control
                  type="phoneno"
                  placeholder="Phone Number*"
                  value={form.phoneno}
                  onChange={(e) => setField('phoneno', e.target.value)}
                  isInvalid={!!errors.phoneno}

                />
                <Form.Control.Feedback type='invalid'>
                  <p>{errors.phoneno}</p>
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  placeholder="Password*"
                  value={form.password}
                  onChange={(e) => setField('password', e.target.value)}
                  isInvalid={!!errors.password}

                />
                <Form.Control.Feedback type='invalid'>
                  <p>{errors.password}</p>
                </Form.Control.Feedback>
              </Form.Group>
              <div className='d-flex justify-content-end'>
                <Button variant="primary" type="submit" onClick={handleSubmit} >
                  Sign UP
                </Button>
              </div>
            </div>

            <div className='container d-flex justify-content-center'>
              Already have Account? <span><NavLink to="/login">LogIn</NavLink></span>
            </div>
 
        
          </Form>

        </Row>

      </div>


    </div>
  )
}

export default Singup
