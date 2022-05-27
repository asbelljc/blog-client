import { useContext } from 'react';
import { ScreenContext } from '../../App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import projectData from './projectData';

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

function Portfolio() {
  const { screen } = useContext(ScreenContext);

  return (
    <Wrapper>
      <Heading screen={screen}>
        <span>{'{ '}</span>
        Portfolio
        <span>{' }'}</span>
      </Heading>
      {/* <ProjectList> */}
      <Project>
        <Title to="#">
          <h2>a</h2>
        </Title>
      </Project>
      <Project>
        <Title to="#">
          <h2>b</h2>
        </Title>
      </Project>
      <Project>
        <Title to="#">
          <h2>c</h2>
        </Title>
      </Project>
      <Project>
        <Title to="#">
          <h2>d</h2>
        </Title>
      </Project>
      <Project>
        <Title to="#">
          <h2>e</h2>
        </Title>
      </Project>
      {/* </ProjectList> */}
    </Wrapper>
  );
}

export default Portfolio;
