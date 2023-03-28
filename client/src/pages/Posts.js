import React, { useEffect, useState } from 'react'
import CardComponent from '../components/CardComponent'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import postService from '../services/postService';

function Posts() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const posts = await postService.getPosts();
    setPosts(posts)
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container className='mt-5'>
      <Row>
        {posts.length > 0 ? posts.map((post) => (
          <Col xs={12} md={6}>
            <CardComponent key={post.id} post={post} />
          </Col>
        )) : <h1 className='text-light'>no post found..</h1>}
      </Row>
    </Container>
  )
}

export default Posts