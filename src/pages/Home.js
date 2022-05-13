import { useContext, useState } from 'react';
import { ScreenContext } from '../App';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import Particles from '../components/Particles';

const Wrapper = styled(PageWrapper)`
  gap: ${({ screen }) => (screen === 'wide' ? '3.2rem' : '2.8rem')};
  height: 100vh;
  padding-top: 0; /* override header-based padding because full-screen */
`;

const Greeting = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.4));

  & h1,
  span {
    font-size: ${({ screen, theme }) => theme.greetingFontSize(screen)};
    font-weight: 600;
    text-align: center;
  }

  & span {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.greeting-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }
  &.greeting-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: transform 1s 1s, opacity 1s 1s;
  }
`;

const ExploreButton = styled(Button)`
  position: relative;
  font-size: 1.6rem;
  width: 16rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.4);

  &.explore-enter {
    opacity: 0;
  }
  &.explore-enter-active {
    opacity: 1;
    transition: opacity 1s 3s;
  }
`;

function Home() {
  const [greetingShown, setGreetingShown] = useState(false);

  const { screen } = useContext(ScreenContext);

  return (
    <Wrapper
      screen={screen}
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { opacity: { duration: 2 } } }}
      exit={{ opacity: 0 }}
    >
      <Particles
        loaded={() => {
          setGreetingShown(true);
        }}
      />
      <CSSTransition
        appear
        in={greetingShown}
        timeout={2000}
        classNames={'greeting'}
      >
        {greetingShown ? ( // without this syntax, greeting jitters visibly before it should even be seen
          <Greeting screen={screen}>
            <div>
              <h1>
                Hi, I'm <span>Jonathan Asbell</span>.
                <br />
                I'm a software engineer.
              </h1>
            </div>
          </Greeting>
        ) : (
          <></>
        )}
      </CSSTransition>
      <CSSTransition
        appear
        in={greetingShown}
        timeout={4000}
        classNames={'explore'}
      >
        <ExploreButton solid link to="about">
          Explore
        </ExploreButton>
      </CSSTransition>
    </Wrapper>
  );
}

export default Home;
