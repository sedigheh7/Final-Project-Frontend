import React, { useEffect, useState } from 'react'
import CardComponent from '../components/CardComponent'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import postService from '../services/postService';
import Form from 'react-bootstrap/Form';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const getPosts = async () => {
    const posts = await postService.getPosts();
    setPosts(posts)
  }
  useEffect(() => {
    getPosts();
    //ask what is this return for?
    return () => {
    };
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      let filteredPosts = [...posts];
      if (filterOption === "1") {
        filteredPosts.sort((a, b) => a.id - b.id);
      } else if (filterOption === "2") {
        filteredPosts.sort((a, b) => b.id - a.id);
      }
      return filteredPosts;
    };
    setFilteredPosts(filterPosts());
  }, [filterOption, posts]);

  const handleFilterChange = (event) => {
    const selectedOption = event.target.value;
    setFilterOption(selectedOption);
  };


  return (
    <Container className='mt-5'>
      <Form.Select className='my-3' aria-label="Default select example" onChange={handleFilterChange}>
        <option value="">Filter by</option>
        <option value="2">newest</option>
        <option value="1">oldest</option>
      </Form.Select>
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