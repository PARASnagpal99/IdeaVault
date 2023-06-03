import React from 'react'
import Body from '../../components/Body/Body'
import {Link} from 'react-router-dom'
import { Button , Card} from 'react-bootstrap'
import ideas from '../../MockData/Ideas'

const MyIdeas = () => {
  return (
    <>
    <Body title="Welcome back Paras">
        <Link to='/createidea'>
          <Button style={{marginLeft : 10 , marginBottom : 6}} size='lg'>
            Create New Idea 
          </Button>
           {
              ideas.map((idea) => (
                <Card style={{ margin: 10 }}> 
                <Card.Header tyle={{ display: "flex" }}>
                 <span
                  style={{
                   color: "black",
                   textDecoration: "none",
                   flex: 1,
                   cursor: "pointer",
                   alignSelf: "center",
                   fontSize: 18,
                 }}
                 >{idea.title}</span>
                <div>
                   <Button>Edit</Button>
                   <Button variant="danger"className="mx-2">Delete</Button>
                 </div>
                  </Card.Header>
               </Card>
              ))
           }
        </Link>
    </Body>
    </>
  )
}

export default MyIdeas