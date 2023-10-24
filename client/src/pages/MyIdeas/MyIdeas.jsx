import React, { useEffect  } from 'react'
import Body from '../../components/Body/Body'
import {Link,useNavigate} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Idea from '../../components/Idea';
import { useDispatch,useSelector } from 'react-redux';
import { listIdeas } from '../../actions/ideasActions';

const MyIdeas = ({search}) => {

  const dispatch = useDispatch() ;
  const navigate = useNavigate();

  const ideaList = useSelector(state => state.ideaList);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading , error , ideas } = ideaList ;

  const ideaCreate = useSelector((state) => state.ideaCreate);
  const { success : successCreate } = ideaCreate;

  const ideaUpdate = useSelector((state) => state.ideaUpdate);
  const { success : successUpdate } = ideaUpdate;
   
  const ideaDelete = useSelector((state)=> state.ideaDelete);
  const {success : successDelete , loading : loadingDelete , error : errorDelete} = ideaDelete;

  useEffect(() =>{
     dispatch(listIdeas())
     if(!userInfo){
      navigate('/')
     }
  },[dispatch,navigate,userInfo,successCreate,successUpdate,successDelete])
  return (
    <Body title={`Welcome back ${userInfo && userInfo.name}`}>
      <div className="cache-message">
       This page is being cached, and ideas may take up to 15 minutes to become visible.
     </div>
        <Link to='/createidea'>
           <Button style={{marginLeft : 10 , marginBottom : 6}} size='lg'>
            Create New Idea 
           </Button>
         </Link>
         {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
         {loadingDelete && <Loading/>}
         {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
         {loading && <Loading/>}
              {
              ideas && ideas
              .filter((idea)=>idea.category.toLowerCase().includes(search.toLowerCase()))
              .map((idea) => (
                    <Idea key={idea._id} idea={idea}></Idea>
              ))
           }
    </Body>
  )
}

export default MyIdeas