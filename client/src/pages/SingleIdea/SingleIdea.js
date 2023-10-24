import React, { useEffect, useState } from "react";
import Body from "../../components/Body/Body";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteIdea, updateIdea } from "../../actions/ideasActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

const  SingleIdea = ()=> {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const ideaUpdate = useSelector((state) => state.ideaUpdate);
  const { loading, error } = ideaUpdate;
  const { userInfo } = useSelector((state) => state.userLogin);

  const ideaDelete = useSelector((state) => state.ideaDelete);
  const { loading: loadingDelete, error: errorDelete } = ideaDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteIdea(id));
    }
    navigate('/myideas');
  };

  useEffect(() => {
    const fetching = async () => {
        const config = {
            headers: {
                 Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get(`/api/ideas/${params.id}`, config);
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setDate(data.updatedAt);
    };

    fetching();
  }, [userInfo,params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateIdea(params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate('/myideas');
  };

  return (
    <Body title="Edit Idea">
      <Card>
        <Card.Header>Edit your Idea</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
           {loadingDelete && <Loading size={50} />}
            {errorDelete &&  <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Idea Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
               onClick={() => deleteHandler(params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </Body>
  );
}

export default SingleIdea;