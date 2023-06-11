import React, { useEffect, useState } from 'react'
import Body from '../../components/Body/Body'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row , Col} from 'react-bootstrap'
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import {login} from '../../actions/userActions'


const LoginPage = () => {

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const dispatch = useDispatch();
 const userLogin = useSelector(state => state.userLogin);
 const {loading , error , userInfo} = userLogin;
 const navigate = useNavigate();

 useEffect(() => {
     if(userInfo){
        navigate('/myideas')
     }
 },[userInfo,navigate])

 const submitHandler = async(e)=>{
       e.preventDefault();
       dispatch(login(email,password))
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