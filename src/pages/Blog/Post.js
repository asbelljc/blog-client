import { useEffect, useState, useContext } from 'react';
import { ScreenContext } from '../../App';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';

const Wrapper = styled(PageWrapper)``;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem 0 3.6rem 0;

  h1 {
    font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '4.2rem')};
    text-align: left;
    padding: 1.2rem 0 1.8rem 0;
  }

  span {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.inactive};
  }
`;

const Tags = styled.div`
  font-family: 'Roboto Mono';
  font-size: 1.2rem;
  display: flex;
  gap: 0.3rem;

  a {
    text-decoration: none;
    border-radius: 0.4rem;
    padding: 0.5rem;
    color: ${({ theme }) => theme.colors.body};
    background: ${({ theme }) => theme.colors.inactive};
    will-change: background;
    transition: background 200ms;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Body = styled.div``;

export default function Post() {
  const [post, setPost] = useState(null);

  const { screen } = useContext(ScreenContext);

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
          <Heading screen={screen}>
            <span>{post.date_time}</span>
            <h1>{post.title}</h1>
            <Tags>
              {post.tags.map((tag) => (
                <Link to="#" key={tag}>
                  {tag}
                </Link>
              ))}
            </Tags>
          </Heading>
          <Body dangerouslySetInnerHTML={{ __html: post.markdown }} />
        </Wrapper>
      )}
    </>
  );
}
