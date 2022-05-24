import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { ScreenContext } from '../../App';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';
import useResizeObserver from '../../hooks/useResizeObserver';

const Wrapper = styled(PageWrapper)`
  min-height: 100vh;
`;

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
  gap: 1.8rem;
  font-family: 'Nunito Sans';
  font-size: 1.6rem;
  /* font-weight: 600; */

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: none;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryGlow};
    }
  }
`;

const BlogList = styled.div`
  margin-left: ${({ screen }) => (screen === 'wide' ? 'auto' : 'none')};
  align-self: ${({ screen }) => (screen === 'wide' ? 'flex-end' : 'auto')};
  width: ${({ screen }) => (screen === 'wide' ? '50%' : 'auto')};
  /* min-width: ${({ screen }) => (screen === 'wide' ? '50%' : 'none')}; */
  display: flex;
  flex-direction: column;
  padding-top: ${({ screen, paddingTop }) =>
    screen === 'wide' ? paddingTop : 48}px;
  font-size: 1.6rem;
`;

const BlogListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
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

  &:last-child {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: 1.3rem;
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

const dummyBlogListData = [
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to fix an issue installing Node `canvas` on macOS',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to fix the objectID required error on Algolia',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to define an auto increment primary key in PostgreSQL',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to fix PostgreSQL saying "relation does not exist"',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to dynamically import JavaScript modules',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to remove the shadow from window screenshots in macOS',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to quickly create a Windows 10 computer on AWS',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'Why does useEffect run two times?',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to fix the "Parse failure: Unterminated string constant" error',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
];

function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await axios.get('/posts', {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
          },
          timeout: 10000,
        });

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
          return; // no need to do anything for 404; just means there are no posts.
        }
      }
    }

    getPosts();
  }, []);

  const { screen } = useContext(ScreenContext);

  const headingRef = useRef(null);
  const { height: headingHeight } = useResizeObserver(headingRef);

  const containerRef = useRef(null);
  const { width: containerWidth } = useResizeObserver(containerRef);

  const wrapperVariant = {
    hidden: { opacity: 0 },
    shown: {
      opacity: 1,
      transition: {
        opacity: { delay: 0.5 },
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <Wrapper
      variants={wrapperVariant}
      initial="hidden"
      animate="shown"
      exit="exit"
    >
      <Container screen={screen} ref={containerRef}>
        <Description screen={screen} maxWidth={containerWidth * 0.5}>
          <Heading screen={screen} ref={headingRef}>
            <span>{'{ '}</span>
            Blog
            <span>{' }'}</span>
          </Heading>
          <Text>
            <p>
              Welcome to my blog! I write here periodically on various topics
              within software development, with an emphasis on tutorials. This
              part of the site is currently under construction, so check back
              soon!
            </p>
          </Text>
        </Description>
        <BlogList screen={screen} paddingTop={headingHeight}>
          {posts
            ? posts.map((post, index) => (
                <BlogListItem key={index}>
                  <span>{post.date}</span>
                  <Title to={post.slug}>
                    <h2>{post.title}</h2>
                  </Title>
                  <Tags>
                    {post.tags.map((tag) => (
                      <Link to="#" key={tag}>
                        {tag}
                      </Link>
                    ))}
                  </Tags>
                </BlogListItem>
              ))
            : null}
          {/* {dummyBlogListData.map((item, index) => {
            const date = `${
              [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ][item.date.getMonth()]
            } ${item.date.getDate()} ${item.date.getFullYear()}`;

            return (
              <BlogListItem key={index}>
                <span>{date}</span>
                <Title href="#">
                  <h2>{item.title}</h2>
                </Title>
                <Tags>
                  {item.tags.map((tag) => (
                    <a href="#" key={tag}>
                      {tag}
                    </a>
                  ))}
                </Tags>
              </BlogListItem>
            );
          })} */}
        </BlogList>
        {/* TODO: make list actually fetch data, probably with use of Suspense for loading; investigate paginated fetching too */}
        {/* TODO: figure out how cms is going to work, prob based on that one tutorial, then MAKE IT! */}
      </Container>
    </Wrapper>
  );
}

export default Blog;
