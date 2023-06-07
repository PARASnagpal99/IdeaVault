import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Container , Row , Button } from 'react-bootstrap'
import './LandingPage.css';

const LandingPage = () => {
   const navigate = useNavigate();
   useEffect(() =>{
      const userInfo = localStorage.getItem('userInfo');  
      if(userInfo){
        navigate('/myIdeas')
      }
     },[navigate])
  return (
    <div className='main'>
         <Container>
            <Row>
                <div className='intro-text'>
                     <div>
                        <h1 className='title'>Welcome to IdeaVault</h1>
                        <p className='subtitle'>Unleash Your Brilliance with Idea Vault: The Ultimate Idea Management Tool</p>
                     </div>
                     <div className='buttonContainer'>
                          <a href='/login'>
                             <Button size='lg' className='landingbutton'>Login</Button>
                          </a>
                          <a href='/register'>
                             <Button size='lg' className='landingbutton' variant='outline-primary'>SignUp</Button>
                           </a>
                     </div>
                </div>
            </Row>
         </Container>
    </div>
  )
}

export default LandingPage