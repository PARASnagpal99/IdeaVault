import React, { useEffect, useState } from 'react'
import {Row , Col , Form , Button} from 'react-bootstrap' ;
import Body from '../../components/Body/Body';
import { useDispatch , useSelector } from 'react-redux';
import "./ProfilePage.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {useNavigate} from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';


const ProfilePage = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [picture,setPicture] = useState('');
  const [password,setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [confirmpassword,setConfirmPassword] = useState('');
  const [picMessage,setPicMessage] = useState('');
  const Navigate = useNavigate();


  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin ;

  const userUpdate = useSelector(state => state.userUpdate);
  const {loading , error , success} = userUpdate ;

  useEffect(() =>{
    if(!userInfo){
        Navigate('/');
    }else{
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPicture(userInfo.picture);
    }
  },[userInfo,Navigate])
  
  const submitHandler =(e)=>{
    e.preventDefault();
    if(password !== confirmpassword){
      setMessage("Passwords do not match");
    }else{
      dispatch(updateProfile(name,picture,email,password));
    }
  }

  const postDetails =(pics)=>{
    if(!pics){
        return setPicMessage("Please select an image");
      }
      setPicMessage(null);
      if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
           const data = new FormData() ;
           data.append('file',pics);
           data.append('upload_preset','IdeaVault');
           data.append('cloud_name', 'ideavault')
           fetch('https://api.cloudinary.com/v1_1/ideavault/image/upload',{
            method : 'post',
            body : data 
           })
           .then(res => res.json())
           .then((data) =>{
            // console.log(data.url.toString());
            setPicture(data.url.toString());
           })
           .catch((err) => {
            console.log(err);
           }) 
      }else{
        setPicMessage("Please select an image");
      }
  }
 
 


  return (
    <Body title="Edit Page">
    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
    {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
    {loading && <Loading />}
    <div>
<Row className="profileContainer">
<Col md={6}>
<Form onSubmit={submitHandler}>
{loading && <Loading />}
{success && (
  <ErrorMessage variant="success">
    Updated Successfully
  </ErrorMessage>
)}
{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
<Form.Group className="mb-3" controlId="formBasicName">
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
</Form.Group>


<Form.Group className="mb-3" controlId="formBasicEmail">
 <Form.Label>Email address</Form.Label>
 <Form.Control type="email" placeholder="Enter email"  value={email}  onChange={(e) => setEmail(e.target.value)}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
 <Form.Label>Password</Form.Label>
 <Form.Control type="password" placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)}/>
</Form.Group>


<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
<Form.Label>Confirm Password</Form.Label>
<Form.Control type="password" placeholder="Password"  value={confirmpassword}  onChange={(e) => setConfirmPassword(e.target.value)}/>
</Form.Group>

{
picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
}

<Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Change Profile Picture</Form.Label>
    <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} />
</Form.Group>

<Button variant="primary" type="submit">
 Update 
</Button>
</Form>
</Col>
<Col style={{
    display : 'flex' ,
    alignItems : 'center' ,
    justifyContent : 'center'
  }}>
  <img src={picture} alt={name} className="profilePic" />
  </Col>
  </Row>
  </div>
 </Body>
     
  )
}

export default ProfilePage