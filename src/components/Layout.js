import Main from './Main';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
