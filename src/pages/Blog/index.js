import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Link, useSearchParams } from 'react-router-dom';
import { ScreenContext } from '../../App';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';
import Button from '../../components/Button';
import useResizeObserver from '../../hooks/useResizeObserver';
import { motion, AnimatePresence } from 'framer-motion';
import FlipMove from 'react-flip-move';
import { useTheme } from 'styled-components';
import { apiURL } from '../../utils/api';

const Wrapper = styled(PageWrapper)``;

const Container = styled.div`
  display: flex;
  flex-direction: ${({ screen }) => (screen === 'wide' ? 'row' : 'column')};
`;

const Description = styled.div`
  position: ${({ screen }) => (screen === 'wide' ? 'fixed' : 'static')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-start' : 'auto')};
  display: flex;
  flex-direction: column;
  max-width: ${({ screen, maxWidth }) =>
    screen === 'wide' ? `${maxWidth}px` : 'none'};
  padding-right: ${({ screen }) => (screen === 'wide' ? '2.4rem' : 0)};
`;

const Heading = styled.h1`
  font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '4.2rem')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-start' : 'center')};
  padding: 0.75em 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Nunito Sans';
  font-size: 1.6rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryGlow};
    }
  }
`;

const PostList = styled.div`
  margin-left: ${({ screen }) => (screen === 'wide' ? 'auto' : 'none')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-end' : 'auto')};
  width: ${({ screen }) => (screen === 'wide' ? '55%' : 'auto')};
  display: flex;
  flex-direction: column;
  padding-top: ${({ screen, paddingTop }) =>
    screen === 'wide' ? paddingTop : 16}px;
  font-size: 1.6rem;
`;

const PostListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: -2px;
  will-change: background;
  transition: background 200ms;

  &::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 200ms;
  }

  &::after {
    content: ' ';
    right: 0;
    top: 0;
    position: absolute;
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 200ms;
  }

  span {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.inactive};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryTint};

    &::before {
      transform: scaleY(1);
    }

    &::after {
      transform: scaleY(1);
    }
  }
`;

const Title = styled(Link)`
  text-decoration: none;

  h2 {
    will-change: color;
    transition: color 200ms;
  }

  &:hover {
    h2 {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Tags = styled.div`
  font-family: 'Roboto Mono';
  font-size: 1.2rem;
  display: flex;
  gap: 0.3rem;

  button {
    text-decoration: none;
    border-radius: 0.4rem;
    border: none;
    padding: 0.5rem;
    color: ${({ theme }) => theme.colors.body};
    background: ${({ theme }) => theme.colors.inactive};
    will-change: background;
    transition: background 200ms;

    &:hover {
      color: ${({ theme }) =>
        theme.colors.body}; /* override default from GlobalStyle */
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ListMessage = styled.div`
  font-size: 1.6rem;
  font-style: italic;
  color: ${({ theme, error }) =>
    error ? theme.colors.error : theme.colors.inactive};
  text-align: center;
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 3.8rem;

  div {
    display: flex;
    flex-direction: ${({ screen }) => (screen === 'wide' ? 'column' : 'row')};
    align-items: ${({ screen }) =>
      screen === 'wide' ? 'flex-start' : 'center'};
    justify-content: space-between;
    gap: 1rem;
  }

  span {
    color: ${({ theme }) => theme.colors.inactive};
    font-size: 1.4rem;
    font-style: italic;
  }

  button {
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
  }
`;

function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get(`${apiURL}/posts`, { timeout: 10000 });

        const postList = await data.posts.map((post) => ({
          ...post,
          date: DateTime.fromISO(post.date_time).toLocaleString(
            DateTime.DATE_MED
          ),
        }));

        setPosts(postList);
      } catch (error) {
        if (404 !== error.response.status) {
          setError(true); // something went wrong fetching data
        } else {
          return; // no posts to show; this is taken care of in rendering rather than state
        }
      }
    }

    getPosts();
  }, []);

  const { screen } = useContext(ScreenContext);

  const theme = useTheme();

  const headingRef = useRef(null);
  const { height: headingHeight } = useResizeObserver(headingRef);

  const containerRef = useRef(null);
  const { width: containerWidth } = useResizeObserver(containerRef);

  return (
    <Wrapper>
      <Container screen={screen} ref={containerRef}>
        <Description screen={screen} maxWidth={containerWidth * 0.45}>
          <Heading screen={screen} ref={headingRef}>
            <span>{'{ '}</span>
            Blog
            <span>{' }'}</span>
          </Heading>
          <Text>
            <p>
              Welcome to my blog! I write here periodically on various topics
              within software development, with an emphasis on tutorials.
            </p>
            <p
              style={{
                color: theme.colors.inactive,
                fontSize: '1.4rem',
                fontStyle: 'italic',
              }}
            >
              This part of the site is currently under construction. Feel free
              to play around with the UI in the meantime, and please check back
              soon!
            </p>
          </Text>
          <FilterBox screen={screen}>
            <AnimatePresence>
              {(() => {
                const tag = searchParams.get('tag');
                return (
                  tag && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span>Filtering by tag '{tag}'</span>
                      <Button onClick={() => setSearchParams({})}>
                        {screen === 'medium' ? 'Clear Filter' : 'Clear'}
                      </Button>
                    </motion.div>
                  )
                );
              })()}
            </AnimatePresence>
          </FilterBox>
        </Description>
        <PostList screen={screen} paddingTop={headingHeight}>
          <FlipMove>
            {posts.length && !error ? (
              posts
                .filter((post) => {
                  const tagFilter = searchParams.get('tag');
                  return tagFilter ? post.tags.includes(tagFilter) : true;
                })
                .map((post) => (
                  <PostListItem key={post.title}>
                    <span>{post.date}</span>
                    <Title to={post.slug}>
                      <h2>{post.title}</h2>
                    </Title>
                    <Tags>
                      {post.tags.map((tag) => (
                        <button
                          onClick={() => setSearchParams({ tag })}
                          key={tag}
                        >
                          {tag}
                        </button>
                      ))}
                    </Tags>
                  </PostListItem>
                ))
            ) : error ? (
              <ListMessage error>Something went wrong...</ListMessage>
            ) : (
              <ListMessage>No posts to show.</ListMessage>
            )}
          </FlipMove>
        </PostList>
      </Container>
    </Wrapper>
  );
}

export default Blog;

// TODO: figure out how cms is going to work, prob based on that one tutorial, then MAKE IT!
// TODO (later, maybe...): add filtering by search (title/tag?)
