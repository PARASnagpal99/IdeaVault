import React , {useState}from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Body from '../../components/Body/Body';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const [picMessage, setPicMessage] = useState(null);
  
  const postDetails = (pics) => {
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
             // console.log(data);
              setPicture(data.url.toString());
             })
             .catch((err) => {
              console.log(err);
             }) 
        }else{
          setPicMessage("Please select an image");
        }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmpassword){
      setMessage('Passwords do not match');
    }else{
       setMessage(null);
       try{
        const config = {
          headers : {
            "Content-Type" : "application/json" ,
          }
        }
        setLoading(true);
        const {data} = await axios.post('/api/users',{name , picture , email , password},config);
        localStorage.setItem('userInfo',JSON.stringify(data));
        setLoading(false);
      }catch(err){
        setError(err.response.data.message);
        setLoading(false);
      }
    }

   // console.log(email);
  }

   
  return (
   <Body title="Register">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
  <Form onSubmit={submitHandler}>
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
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="file" onChange={(e) => postDetails(e.target.files[0])} />
  </Form.Group>

   <Button variant="primary" type="submit">
     Submit
   </Button>
 </Form>
 </Body>
  )
}

export default RegisterPage