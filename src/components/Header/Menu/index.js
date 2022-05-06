import styled, { useTheme } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import UserControls from './UserControls';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  /* critical bits for react-transition-group */
  transform-origin: top;
  &.menu-enter {
    transform: scaleY(0);
  }
  &.menu-enter-active {
    transform: scaleY(1);
    transition: transform ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
  &.menu-exit {
    opacity: 1;
  }
  &.menu-exit-active {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
`;

function Menu({ isOpen, setOpen }) {
  const theme = useTheme();

  return (
    <CSSTransition
      in={isOpen}
      timeout={theme.timeouts.toggleMenu}
      classNames="menu"
      unmountOnExit
    >
      <Wrapper>
        <UserControls setMenuOpen={setOpen} />
      </Wrapper>
    </CSSTransition>
  );
}

export default Menu;
