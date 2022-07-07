import { useContext } from 'react';
import { ScreenContext } from '../../App';
import styled from 'styled-components';
import PageWrapper from '../../components/PageWrapper';
import projectData from '../../assets/portfolio/projectData';

const Wrapper = styled(PageWrapper)`
  align-items: stretch;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '4.2rem')};
  padding: 0.75em 0;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Project = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ screen }) => (screen === 'wide' ? 'row' : 'column')};
  align-items: center;
  gap: ${({ screen }) => (screen !== 'wide' ? '1.6rem' : '3.2rem')};
  padding: ${({ screen }) => (screen !== 'wide' ? '1.6rem' : '3.2rem')};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: -2px;
  will-change: background;
  transition: background 300ms;

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
    transition: transform 300ms;
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
    transition: transform 300ms;
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

const Thumbnail = styled.a`
  display: block;
  overflow: ${({ screen }) => (screen === 'wide' ? 'visible' : 'hidden')};
  max-height: ${({ screen }) => (screen === 'wide' ? 'none' : '30rem')};
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.5);

  img {
    display: block;
    width: ${({ screen }) => (screen === 'wide' ? '30rem' : '100%')};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ screen }) => (screen === 'wide' ? 'flex-start' : 'center')};
  gap: 1rem;
  padding: 1rem 0;
`;

const Title = styled.a`
  text-decoration: none;
  text-align: ${({ screen }) => (screen !== 'wide' ? 'center' : 'left')};

  h2 {
    will-change: color;
    transition: color 200ms;
    padding: 1rem 0;
    line-height: 1.15;
  }

  &:hover {
    h2 {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Description = styled.p`
  font-size: 1.6rem;

  strong {
    font-weight: 900;
  }
`;

const Links = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.inactive};

  a {
    font-weight: bold;
  }
`;

function Portfolio() {
  const { screen } = useContext(ScreenContext);

  return (
    <Wrapper>
      <Heading screen={screen}>
        <span>{'{ '}</span>
        Portfolio
        <span>{' }'}</span>
      </Heading>
      {projectData.map((project) => (
        <Project key={project.title} screen={screen}>
          {screen !== 'wide' ? (
            <Title href={project.repoUrl} target="_blank" screen={screen}>
              <h2>{project.title}</h2>
            </Title>
          ) : null}
          <Thumbnail href={project.demoUrl} target="_blank" screen={screen}>
            <div>
              <img src={project.thumbnailPath} alt={project.thumbnailAlt} />
            </div>
          </Thumbnail>
          <Info screen={screen}>
            {screen === 'wide' ? (
              <Title href={project.repoUrl} target="_blank" screen={screen}>
                <h2>{project.title}</h2>
              </Title>
            ) : null}
            <Description
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            <Links>
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                Repo
              </a>
              {' | '}
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                Demo
              </a>
            </Links>
          </Info>
        </Project>
      ))}
    </Wrapper>
  );
}

export default Portfolio;
