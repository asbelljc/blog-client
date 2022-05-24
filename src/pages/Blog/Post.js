import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';

const Wrapper = styled(PageWrapper)``;

const Heading = styled.div``;

export default function Post() {
  const [post, setPost] = useState(null);

  const { post: slug } = useParams();

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`/posts/${slug}`);

        setPost(data.post);
      } catch (error) {
        if (404 !== error.response.status) {
          // redirect to error page!
        } else {
          return; // redirect to 404 page!
        }
      }
    }

    getPost();
  }, [slug]);

  return (
    <>
      {post && (
        <Wrapper>
          <Heading>
            <h1>{post.title}</h1>
          </Heading>
        </Wrapper>
      )}
    </>
  );
}
