import React, { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { LoginSocialGoogle } from 'reactjs-social-login'

function RightSide() {
  const history = useNavigate();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [empdata, empdatachange] = useState(null);

  let isValid = false;
  let id = "";
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

  const redirectDetails = (provider, data) => {
    console.log(provider, data)
    if (data !== null) {
      history('/details');
    }
  }

  const validateForm = () => {
    const { email, password } = form
    const newErrors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || email === '')
      newErrors.email = 'Please Enter Valid Email.'
    else if (regex === true) newErrors.email = 'Please Enter Valid Email.'
    if (!password || password === ' ') newErrors.password = 'Please Enter Valid password.'
    else if (password.length < 4) newErrors.password = 'Please Enter at least 4 character.'

    return newErrors

  }

  useEffect(() => {
    fetch("http://localhost:4000/user").then((res) => {
      return res.json();
    }).then((resp) => {
      empdatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form)
    console.log(empdata)
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else if (Object.keys(formErrors).length === 0) {

      for (let i = 0; i < empdata.length; i++) {
        for (let j = 0; j < 5; j++) {
          if (empdata[i].email === (form.email) &&
            empdata[i].password === (form.password)) {
            isValid = true;
            id = empdata[i].id
            console.log(empdata[i].id)
            break;
          }
        }
        if (isValid) {
          break;
        }
      }

      if (isValid) {
        history("/details/")
      } else {
        alert("Email or Password is wrong");
        return errors;

      }
      // 

    }
  }


  return (
    <div className='container'>
      <div className='container'>
        <Row className='mb-3'>
        <div className='Container mt-3 d-flex justify-content-center'>
              Welcome to User Managnemt System.
            </div>
          <Form  className=' container mb-5   justify-content-center'>
            <div className='container mb-5  justify-content-center' >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  isInvalid={!!errors.email} />
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setField('password', e.target.value)}
                  isInvalid={!!errors.password} />
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>


              <div className='d-flex justify-content-end'>
                <NavLink to='#' className='mb-2' >Forget Password?</NavLink>
              </div>
              <div className='d-flex justify-content-end'>
                <Button variant="primary" onClick={handleSubmit}>Login</Button>
              </div>
              <div className='container d-flex justify-content-center'>
                Don't have Account? <span><NavLink to="/">SignIn</NavLink></span>
              </div>
              <div className='container d-flex justify-content-center'>
                <p><b>OR LOGIN USING</b></p>
              </div>
              <div className='container d-flex justify-content-center'>

              <LoginSocialGoogle
                            client_id={"149074873759-kl4je3e0qvpq0jflcvjv536kiod1r3qk.apps.googleusercontent.com"}
                            scope="openid profile email"
                            discoveryDocs="claims_supported"
                            access_type="offline"
                            onResolve={({ provider, data }) => {
                                console.log(provider, data);
                                redirectDetails(provider, data);
                            }}
                            onReject={(err) => {
                                console.log(err);
                            }}
                        >
                            <GoogleLoginButton />
                        </LoginSocialGoogle>
              </div>
            </div>

          </Form>
        </Row>

      </div>





    </div>

  )
}

export default RightSide
