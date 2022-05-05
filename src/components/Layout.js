import Header from './Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

// ensures fixed header does not cover content when closed
const HeaderSpacer = styled.div`
  width: 100%;
  height: 80px; /* height of closed header */
`;

export default function Layout() {
  return (
    <>
      <Header />
      <HeaderSpacer />
      <Outlet />
    </>
  );
}
