import { useContext } from 'react';
import { ScreenContext } from '../App';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// ensures fixed header does not cover content when closed
const HeaderSpacer = styled.div`
  width: 100%;
  height: ${({ screen, theme }) =>
    screen === 'narrow'
      ? theme.barHeight.small
      : theme.barHeight.large}; /* height of closed header */
`;

export default function Layout() {
  const screen = useContext(ScreenContext);

  return (
    <>
      <Header />
      <HeaderSpacer screen={screen} />
      <Outlet />
    </>
  );
}
