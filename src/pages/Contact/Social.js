import { useContext } from 'react';
import { ScreenContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Container = styled.div`
  align-self: ${({ screen }) => (screen === 'wide' ? 'auto' : 'center')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  padding-top: ${({ screen }) => (screen === 'wide' ? '3.2rem' : '6.4rem')};

  path {
    color: ${({ theme }) => theme.colors.primary};
    transition: fill 0.15s;
  }

  a {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-size: 1.4rem;
    font-weight: bold;

    span {
      transition: color 0.15s;
      color: ${({ theme }) => theme.colors.inactive};
    }
  }

  a:hover {
    path {
      fill: ${({ theme }) => theme.colors.primaryGlow};
    }

    span {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export default function Social() {
  const { screen } = useContext(ScreenContext);

  return (
    <Container screen={screen}>
      <a href="http://github.com/asbelljc" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />{' '}
        <span>github.com/asbelljc</span>
      </a>
      <a
        href="http://linkedin.com/in/jcasbell"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedinIn} size="2x" />{' '}
        <span>linkedin.com/in/jcasbell</span>
      </a>
      <a href="mailto:asbelljc@gmail.com">
        <FontAwesomeIcon icon={faEnvelope} size="2x" />{' '}
        <span>asbelljc@gmail.com</span>
      </a>
    </Container>
  );
}
