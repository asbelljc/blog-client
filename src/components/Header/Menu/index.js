import styled, { useTheme } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import UserControls from './UserControls';
import { useContext } from 'react';
import { ScreenContext } from '../../../App';
import Nav from './Nav';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ screen }) => (screen === 'wide' ? 'flex-end' : 'stretch')};
  gap: min(5vw, 2.8rem);
  padding: min(5vw, 2.8rem) 0;

  /* horizontal divider at top */
  :before {
    position: absolute;
    top: 0;
    content: '';
    height: 1px;
    width: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }

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
  const { screen } = useContext(ScreenContext);

  const theme = useTheme();

  return (
    <CSSTransition
      in={isOpen}
      timeout={theme.timeouts.toggleMenu}
      classNames="menu"
      unmountOnExit
    >
      <Wrapper screen={screen}>
        <Nav setMenuOpen={setOpen} />
        <UserControls setMenuOpen={setOpen} />
      </Wrapper>
    </CSSTransition>
  );
}

export default Menu;

// HEY JON-JON DO THE FUCKIN NAV BUDDY!
