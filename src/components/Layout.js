import { Outlet } from 'react-router-dom';
import Main from './Main';

export default function Layout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}
