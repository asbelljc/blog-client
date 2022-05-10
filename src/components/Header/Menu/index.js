import styled, { css, useTheme } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { useContext } from 'react';
import { ThemeControl } from '../../../index';
import { ScreenContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import UserControls from './UserControls';
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

    ${({ theme }) =>
      theme.dark &&
      css`
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.4) 50%,
          rgba(0, 0, 0, 0) 100%
        );
      `}
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

const ThemeToggler = styled.button`
  align-self: ${({ screen }) => (screen === 'narrow' ? 'center' : 'flex-end')};
  background: transparent;
  border: none;
  margin-top: max(-2.5vw, -1.4rem);
  margin-bottom: max(-5vw, -2.8rem);
  padding-bottom: min(2.5vw, 1.4rem);

  path {
    fill: ${({ theme }) => theme.colors.inactive};
    transition: fill 150ms;
  }

  &:hover {
    path {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
`;

function Menu({ isOpen, setOpen }) {
  const { screen } = useContext(ScreenContext);
  const { toggleTheme } = useContext(ThemeControl);

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
        <ThemeToggler screen={screen} onClick={toggleTheme}>
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </ThemeToggler>
      </Wrapper>
    </CSSTransition>
  );
}

export default Menu;
