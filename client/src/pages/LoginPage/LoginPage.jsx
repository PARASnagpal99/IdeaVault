import React, { useState } from 'react'
import axios from 'axios';
import Body from '../../components/Body/Body'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row , Col} from 'react-bootstrap'
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const LoginPage = () => {

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const [error,setError] = useState(false)
 const [loading,setLoading] = useState(false)

 

 const submitHandler = async(e)=>{
  e.preventDefault();

  try{
    const config = {
      headers : {
        "Content-Type" : "application/json" ,
      }
    }
    setLoading(true);
    const {data} = await axios.post('/api/users/login',{email,password},config);
    console.log(data);
    localStorage.setItem('userInfo',JSON.stringify(data));
    setLoading(false);
  }catch(err){
    setError(err.response.data.message);
    setLoading(false);
  }




  console.log(email,password)
 }

  return (
    <Body title="LOGIN">
    <Form onSubmit={submitHandler}>
    {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
    {loading && <Loading/>}

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Form.Text className="text-muted">
      "Unlock a world of inspiration. Login to IdeaVault and embark on a journey to turn your ideas into reality."
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" value={password} placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
    </Form.Group>
   
    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Row className="py-3">
    <Col>
      New Customer ? <Link to="/register">Register Here</Link>
    </Col>
    </Row>
    </Form>
  </Body>
  )
}

export default LoginPage