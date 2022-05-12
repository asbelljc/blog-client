import { useContext } from 'react';
import { ScreenContext } from '../App';
import styled, { useTheme } from 'styled-components';
import Particles from '../components/Particles';

const Test = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  height: 100vh;
  font-size: ${({ screen, theme }) => theme.greetingFontSize(screen)};
  font-weight: 600;
  text-align: center;
  filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.4));

  & span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function Home() {
  const { screen } = useContext(ScreenContext);
  const theme = useTheme();

  const testHeight =
    screen === 'narrow' ? theme.headerHeight.small : theme.headerHeight.large;

  return (
    <>
      <Particles />
      <Test screen={screen}>
        <div>
          Hi, I'm <span>Jonathan</span>.
          <br />
          I'm a software engineer.
        </div>
      </Test>
    </>
  );
}

export default Home;
