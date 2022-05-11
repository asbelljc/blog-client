import { useContext } from 'react';
import { ScreenContext } from '../App';
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ screen, theme }) => theme.contentWidth(screen)};
  height: 500px;
  background: pink;
`;

export default function Home() {
  const { screen } = useContext(ScreenContext);

  return <Wrapper screen={screen}></Wrapper>;
}
