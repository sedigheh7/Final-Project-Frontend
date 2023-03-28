import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import postService from '../services/postService';
import Swal from 'sweetalert2'

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createPost = async (e) =>{
    e.preventDefault();
    const newPost = {title,content}
    if (title.length > 0 && content.length > 0) { 
      /*
      validating forms like this actually is not recommended, 
      in a real app we should be a lot stricter than this (you can use a library like formik instead)
      but right now this should do the job
      */
      await postService.createPost(newPost);
      setTitle('');
      setContent('');
      Swal.fire(
        'Good job!',
        'Your post is live now',
        'success'
      )
    }
  }

  return (
    <Container className="mt-5">
      <h1 className='text-light'>Create new Post</h1>
      <Form onSubmit={(e) => createPost(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" placeholder="title" />
        </Form.Group>

        <FloatingLabel
          controlId="floatingTextarea"
          label="content"
          className="mb-3"
        >
          <Form.Control
            value={content}
            onChange={(e) => setContent(e.target.value)}
            as="textarea" 
            style={{ height: '100px' }} />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default CreatePost