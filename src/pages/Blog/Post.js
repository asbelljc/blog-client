import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';

const Wrapper = styled(PageWrapper)``;

const Heading = styled.div``;

export default function Post() {
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const { post: slug } = useParams();

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`/posts/${slug}`);

        const post = {
          ...data.post,
          date_time: DateTime.fromISO(data.post.date_time).toLocaleString(
            DateTime.DATETIME_MED
          ),
        };

        setPost(post);
      } catch (error) {
        if (404 !== error.response.status) {
          navigate('/error');
        } else {
          navigate('/404');
        }
      }
    }

    getPost();
  }, [slug, navigate]);

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
