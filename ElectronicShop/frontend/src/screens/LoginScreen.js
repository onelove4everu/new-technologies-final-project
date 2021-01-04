import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FaFacebook, FaGoogle } from "react-icons/fa";


import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, loginSocial } from '../actions/userActions'

const GOOGLE_CLIENT_ID = "171400011303-h9r78n7lafkceoqov7agfi3d4p341lpc.apps.googleusercontent.com"
const FACEBOOK_CLIENT_ID = "440338657001478"

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const responseGoogle = (response) => {
    console.log(response);
    const { name, email } = response.profileObj
    dispatch(loginSocial(email, name))
  }

  const responseFacebook = (response) => {
    console.log(response);
    const { name, email } = response
    dispatch(loginSocial(email, name))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='col-md-2' style={{ marginRight: 10 }}>
          Login
        </Button>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={renderProps => (
            <Button 
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant='primary'
              className='col-md-4'
              style={{ marginRight: 10 }}
            >
              <FaGoogle style={{ marginBottom: 2 }} /> Google
            </Button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId={FACEBOOK_CLIENT_ID}
          callback={responseFacebook}
          fields="name,email,picture"
          render={renderProps => (
            <Button 
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant='primary'
              className='col-md-4'
            >
              <FaFacebook style={{ marginBottom: 2 }} /> Facebook
            </Button>
          )}
        />
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
