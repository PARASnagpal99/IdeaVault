import React from 'react'
import { Badge,Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { useDispatch} from 'react-redux';
import Card from 'react-bootstrap/Card';
import { deleteIdea } from '../actions/ideasActions';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: 'pink' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

const Idea = (idea) => {
  const dispatch = useDispatch();

  const deleteHandler =(id)=>{
    if(window.confirm('Are you sure ?')){
        dispatch(deleteIdea(id));
    }
}
  idea = idea.idea
  return (
    <Accordion>
    <Card key={idea._id}style={{ margin: 10 }}> 
                <Card.Header style={{ display: "flex" }}>
                 <span
                  style={{
                   color: "black",
                   textDecoration: "none",
                   flex: 1,
                   cursor: "pointer",
                   alignSelf: "center",
                   fontSize: 18,
                 }}
                 >
                 <CustomToggle as={Card.Text} variant="link" eventKey="0">
                 {idea.title}
                 </CustomToggle>
                
                  </span>
̣̣             <div>
                   <Button href={`/ideas/${idea._id}`}>Edit</Button>
                   <Button variant="danger" className="mx-2" onClick={()=> deleteHandler(idea._id)}>
                      Delete
                  </Button>
                </div>
                  </Card.Header>
            <Accordion.Collapse eventKey='0'>
            <Card.Body>
            <h4>
                <Badge variant='success'>
                Category - {idea.category}
                </Badge>
            </h4>
               
         <blockquote className="blockquote mb-0">
              <p>{idea.content}</p>
           <footer className="blockquote-footer">
             created on - {idea.createdAt.substring(0, 10)}
            </footer>
         </blockquote>
       </Card.Body>
            </Accordion.Collapse>
      </Card>
      </Accordion>
  )
}

export default Idea