import { useContext } from 'react';
import { ScreenContext } from '../App';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ensures fixed header does not cover content when closed
const HeaderSpacer = styled.div`
  width: 100%;
  height: ${({ screen, theme }) =>
    screen === 'narrow'
      ? theme.headerHeight.small
      : theme.headerHeight.large}; /* height of closed header */
`;

export default function Layout() {
  const { screen } = useContext(ScreenContext);

  return (
    <>
      <Header />
      <HeaderSpacer screen={screen} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
