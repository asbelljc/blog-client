import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  margin-top: 6.4rem;
  padding: 0.75em 0;
  font-family: 'Roboto Mono', 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  text-align: center;

  span {
    /* copyright symbol appears too small compared to rest of font without this tweak */
    font-size: 1.6rem;
  }

  * {
    color: ${({ theme }) => theme.colors.inactive};
  }
`;

const Copyright = styled.div`
  margin: 0 auto;
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  path {
    transition: fill 0.15s;
  }

  a:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default function Footer() {
  const location = useLocation();

  return (
    <Wrapper>
      {location.pathname !== '/contact' && (
        <Social>
          <a href="http://github.com/asbelljc" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href="http://linkedin.com/in/jcasbell"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
          </a>
          <a href="mailto:asbelljc@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
          </a>
        </Social>
      )}
      <Copyright>
        Copyright <span>©</span> {new Date().getFullYear()} Jonathan Asbell
        <br />
        All rights reserved
      </Copyright>
    </Wrapper>
  );
}
