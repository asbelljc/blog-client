import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';
import src from '../assets/headshot.jpg';
import { useContext } from 'react';
import { ScreenContext } from '../App';

const Wrapper = styled(PageWrapper)``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Heading = styled.h1`
  font-size: ${({ screen }) => (screen === 'narrow' ? '3.6rem' : '4.2rem')};
  align-self: center;
  padding: 0.5em 0; /* em lets us do self-proportional padding (i.e. 1em = font-size) */

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Body = styled.p`
  font-family: 'Nunito Sans';
  font-size: 1.8rem;
  /* font-weight: 600; */
  /* line-height: 1.4em; */
`;

const Headshot = styled.div`
  position: relative;
  align-self: center;
  max-width: 43.2rem;
  border-radius: 100rem;

  img {
    display: block;
    object-fit: cover;
    object-position: top;
    width: 100%;
    aspect-ratio: 1;
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
    border: ${({ screen }) => (screen === 'narrow' ? '3px' : '5px')} solid
      ${({ theme }) => theme.colors.primary};
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
  const { screen } = useContext(ScreenContext);

  return (
    <Wrapper
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { opacity: { delay: 0.3 } } }}
      exit={{ opacity: 0 }}
    >
      <Content>
        <Heading screen={screen}>
          <span>{'{ '}</span>About<span>{' }'}</span>
        </Heading>
        <Headshot screen={screen}>
          <img
            src={src}
            alt="The author's portrait. A young man smiling at the camera."
          />
        </Headshot>
        <Body>
          Hi! I'm Jonathan! I'm a programmer and at the moment I'm just typing a
          bunch of random stuff to see how this paragraph works in the layout.
          I'm hoping it's good! We'll see soon enough. Still gotta get some
          styled-components business going on. Bout to change this p tag to a
          styled something-or-other. Anyway, enough type! I think I've got this
          thing long enough for the time being!
        </Body>
      </Content>
    </Wrapper>
  );
}

export default About;
