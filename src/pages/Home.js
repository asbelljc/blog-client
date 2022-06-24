import { useContext, useState } from 'react';
import { ScreenContext } from '../App';
import styled, { useTheme } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import DotGrid from '../components/DotGrid';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled(PageWrapper)`
  position: relative;
  align-items: center;
  justify-content: center;
  gap: ${({ screen }) => (screen === 'wide' ? '3.2rem' : '2.8rem')};
  height: 100vh;
  padding-top: 0; /* override header-based padding because full-screen */
`;

const DotGridAnimation = styled(DotGrid)``;

const Greeting = styled.div`
  user-select: none;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: ${({ theme }) =>
    theme.dark
      ? 'drop-shadow(0 0.2rem 0.2rem rgba(0, 0, 0, 0.8))'
      : 'drop-shadow(0 0.1rem 0.1rem rgba(0, 0, 0, 0.4))'};

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
    transition: transform 1s 0.5s, opacity 1s 0.5s;
  }
`;

const ExploreButton = styled(Button)`
  position: relative;
  font-size: 1.6rem;
  width: 16rem;
  box-shadow: ${({ theme }) =>
    theme.dark
      ? '0 0.2rem 0.2rem rgba(0, 0, 0, 0.8)'
      : '0 0.1rem 0.1rem rgba(0, 0, 0, 0.8)'};

  &.explore-enter {
    opacity: 0;
  }
  &.explore-enter-active {
    opacity: 1;
    transition: opacity 1s 2.5s;
  }
`;

function Home() {
  const [readyForContent, setReadyForContent] = useState(false);

  const { screen } = useContext(ScreenContext);

  const theme = useTheme();

  return (
    <Wrapper
      screen={screen}
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { opacity: { duration: 1 } } }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => setReadyForContent(true)}
    >
      <DotGridAnimation
        dotSpacing={screen === 'narrow' ? 30 : 40}
        dotColor={theme.colors.dotGridColor}
        lineWidth={screen === 'narrow' ? 6 : 8}
        alphaTickCount={100}
        maxMagnitude={screen === 'narrow' ? 15 : 20}
        radius={2000}
      />
      <CSSTransition
        appear
        in={readyForContent}
        timeout={1500}
        classNames={'greeting'}
      >
        {readyForContent ? ( // without this syntax, greeting jitters visibly before it should even be seen
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
        in={readyForContent}
        timeout={3500}
        classNames={'explore'}
      >
        {readyForContent ? (
          <ExploreButton solid link to="about">
            Explore
          </ExploreButton>
        ) : (
          <></>
        )}
      </CSSTransition>
    </Wrapper>
  );
}

export default Home;
