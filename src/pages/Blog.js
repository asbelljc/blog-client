import { useContext, useRef } from 'react';
import { ScreenContext } from '../App';
import styled from 'styled-components';
import PageWrapper from '../components/PageWrapper';
import useResizeObserver from '../hooks/useResizeObserver';

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
  max-width: ${({ screen }) => (screen === 'wide' ? '50%' : 'none')};
  display: flex;
  flex-direction: column;
  padding-top: ${({ screen, paddingTop }) =>
    screen === 'wide' ? paddingTop : 48}px;
  font-size: 1.6rem;
`;

const BlogListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  transition: background 150ms;

  span {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.inactive};
  }

  &:last-child {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryTint};
  }
`;

const Tags = styled.div`
  font-family: 'Roboto Mono';
  font-size: 1.2rem;
  display: flex;
  gap: 0.3rem;

  a {
    text-decoration: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: ${({ theme }) => theme.colors.body};
    background: ${({ theme }) => theme.colors.inactive};
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
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
  {
    date: new Date(),
    title: 'How to use the Node.js fs module with async/await',
    tags: ['Node.js', 'Python', 'JavaScript'],
  },
];

function Blog() {
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
          {dummyBlogListData.map((item, index) => {
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
                <h2>{item.title}</h2>
                <Tags>
                  {item.tags.map((tag) => (
                    <a href="#" key={tag}>
                      {tag}
                    </a>
                  ))}
                </Tags>
              </BlogListItem>
            );
          })}
        </BlogList>
      </Container>
    </Wrapper>
  );
}

export default Blog;
