import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';
import src from '../assets/headshot.jpg';

const Wrapper = styled(PageWrapper)``;

const Heading = styled.h1`
  font-size: 4.2rem;
  align-self: center;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Headshot = styled.div`
  position: relative;
  align-self: center;
  margin: 3.2rem 0;
  max-width: 43.2rem;
  border-radius: 100rem;

  img {
    display: block;
    object-fit: cover;
    object-position: top;
    width: 100%;
    aspect-ratio: 1;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    border-radius: 100rem;
    filter: saturate(0) contrast(1.1);
    transition: filter 250ms;
  }

  &::after {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 100rem;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    transform: translate3d(0, 0, 0), scale(1);
    transition: transform 250ms;
  }

  @media (hover: hover) {
    &:hover {
      img {
        filter: none;
      }

      &::after {
        transform: translate3d(1.6rem, 1.6rem, 0);
      }
    }
  }
`;

function About() {
  return (
    <Wrapper
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { opacity: { delay: 0.3 } } }}
      exit={{ opacity: 0 }}
    >
      <Heading>
        <span>{'{ '}</span>About<span>{' }'}</span>
      </Heading>
      <Headshot>
        <img
          src={src}
          alt="The author's portrait. A young man smiling at the camera."
        />
      </Headshot>
    </Wrapper>
  );
}

export default About;
