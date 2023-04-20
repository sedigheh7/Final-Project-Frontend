import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import postService from '../services/postService';
import { Container, Row, Col } from 'react-bootstrap';
import Comment from './comment.js';
// import commentService from '../services/commentService';

function Post() {
  const [post, setPost] = useState();
  // const [comment, setComment] = useState()
  const { postId } = useParams()

  const getPostById = async () => {
    const fetchedPost = await postService.getPostById(postId)
    if (fetchedPost) {
      setPost(fetchedPost);
    }
  }

  // const getCommentByPostId = async () => {
  //   const fetchedComment = await commentService.getCommentByPostId(postId)
  //   if (fetchedComment) {
  //     setComment(fetchedComment);
  //   }
  // }

  useEffect(() => {
    getPostById()
    // getCommentByPostId()

  }, []);



  return (
    <div>
      {post ?
        <>
          <header className="masthead" style={{ backgroundImage: "url('https://hicoders.ch/wp-content/uploads/2022/03/66-Talent.png')", backgroundSize: "contain" }}>
            <Container className="position-relative px-4 px-lg-5">
              <Row className="gx-4 gx-lg-5 justify-content-center">
                <Col md={10} lg={8} xl={7}>
                  <div className="site-heading">
                    <h1>{post?.title}</h1>
                    <span className="subheading">published on {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(post.createdAt))}</span>
                  </div>
                </Col>
              </Row>
            </Container>
          </header>
          <Container>
            <Row>
              <div className='text-start text-light mb-5'>{post?.content}</div>
            </Row>
            <Comment />
          </Container>
        </>
        :
        <h1>
          post not found :
        </h1>
      }
    </div>
  )
}

export default Post