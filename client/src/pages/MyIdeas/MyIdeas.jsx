import React, { useEffect , useState } from 'react'
import axios from 'axios';
import Body from '../../components/Body/Body'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
// import ideas from '../../MockData/Ideas'
import Idea from '../../components/Idea';

const MyIdeas = () => {
  const [ideas,setIdeas] = useState([]);

  const fetchIdeas = async() =>{
       const {data} = await axios.get("api/ideas")
       setIdeas(data);
       console.log(data);
  }

  useEffect(() =>{
     fetchIdeas();
  },[])

  return (
    <Body title="Welcome back Paras">
        <Link to='/createidea'>
           <Button style={{marginLeft : 10 , marginBottom : 6}} size='lg'>
            Create New Idea 
           </Button>
         </Link>
        {
              ideas.map((idea) => (
                    <Idea key={idea._id} idea={idea}></Idea>
              ))
           }
    </Body>
  )
}

export default MyIdeas