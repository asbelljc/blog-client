import { useEffect, useState, useContext } from 'react';
import { ScreenContext } from '../../App';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';
import Loader from '../../components/Loader';
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
import prism from './style/prism';
import CommentSection from '../../components/CommentSection';
import { apiURL } from '../../utils/api';

const Wrapper = styled(PageWrapper)`
  max-width: 72rem;
  margin: ${({ screen }) =>
    screen === 'narrow' ? 'auto' : '6.4rem auto 0 auto'};
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.2rem 0 3.6rem 0;
`;

const TimeStamp = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.inactive};
`;

const Title = styled.h1`
  font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '6rem')};
  text-align: left;
  padding: ${({ screen }) =>
    screen === 'narrow' ? '1.2rem 0 1.8rem 0' : '2.4rem 0 3.6rem 0'};
`;

const Tags = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2rem;
  display: flex;
  align-self: stretch;
  align-items: center;
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
      color: ${({ theme }) => theme.colors.body};
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  &::after {
    content: '';
    flex-grow: 1;
    height: 0.3rem;
    margin-left: 0.6rem;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Body = styled.div`
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 2.8rem 0 2.8rem 0;
  }

  h2 {
    display: flex;
    gap: 0.3rem;
    align-items: center;

    &::after {
      content: '';
      flex-grow: 1;
      height: 0.3rem;
      margin-left: 0.6rem;
      background: ${({ theme }) => theme.colors.primary};
    }
  }

  li::marker {
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    line-height: 2.8rem;
    font-size: 1.8rem;
    padding-bottom: 2.8rem;
  }

  img {
    max-width: 100%;
    height: auto;
  }
  /* ...change this to .pre-header or similar for final product... */
  .blog-post-body-code-snippet-header {
    background-color: ${({ theme }) => theme.colors.preHeaderBg};
    border-radius: 0.6rem 0.6rem 0 0;
    font-size: 1.3rem;
    padding: 1rem;
    cursor: default;

    * {
      color: ${({ theme }) => theme.colors.preHeader};
    }
  }

  blockquote {
    padding: 4.2rem;
    margin-top: 0px;
    margin-bottom: 2.8rem;
    color: rgba(0, 0, 0, 0.8);
    border: none;
    background: ${({ theme }) => theme.colors.primaryTintHeavy};
    border-radius: 0.6rem;
    line-height: 1;

    > * {
      font-size: 2rem;
      font-style: italic;
      padding: 0;
    }
  }

  ${({ theme }) => (theme.light ? prism.light : prism.dark)};
`;

export default function Post() {
  const [post, setPost] = useState(null);

  const { screen } = useContext(ScreenContext);

  const navigate = useNavigate();

  const { post: slug } = useParams();

  const handleLineHighlights = () => {
    const blocksWithLineHighlights = Array.from(
      document.querySelectorAll('[data-line]')
    );

    blocksWithLineHighlights.forEach((block) => {
      const lines = block.getAttribute('data-line');
      const pre = block.querySelector('pre');

      if (lines && pre) {
        // prism line-highlight plugin is looking for this attribute
        pre.setAttribute('data-line', lines);
      }
    });
  };

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios.get(`${apiURL}/posts/${slug}`, {
          timeout: 10000,
        });

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

  useEffect(() => {
    if (post) {
      handleLineHighlights();
      Prism.highlightAll();
    }
  }, [post]);

  return (
    <Wrapper screen={screen}>
      {post ? (
        <>
          <Heading screen={screen}>
            <TimeStamp>{post.date_time}</TimeStamp>
            <Title screen={screen}>{post.title}</Title>
            <Tags>
              {post.tags.map((tag) => (
                <Link to={`/blog?tag=${encodeURI(tag)}`} key={tag}>
                  {tag}
                </Link>
              ))}
            </Tags>
          </Heading>
          <Body dangerouslySetInnerHTML={{ __html: post.markdown }} />
          <CommentSection post={post} />
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
}
