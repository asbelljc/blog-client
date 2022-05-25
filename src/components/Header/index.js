import { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext, ScreenContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import styled, { css, useTheme } from 'styled-components';
import useResizeObserver from '../../hooks/useResizeObserver';
import Menu from './Menu';

const DynamicWrapper = styled.header`
  position: fixed;
  z-index: 100;
  width: 100%;
  background: ${({ theme, scrollY, isMenuOpen }) =>
    !scrollY && !isMenuOpen ? 'transparent' : theme.colors.body};
  box-shadow: ${({ theme, isHidden, scrollY, isMenuOpen }) =>
    isHidden || (!scrollY && !isMenuOpen) ? 'none' : theme.headerShadow};
  transform: ${({ isHidden }) =>
    isHidden ? 'translateY(-100%)' : 'translateY(0)'};

  /* critical bits for dynamic resizing */
  height: ${({ height }) => height}px;
  transition: ${({ theme }) => theme.themeTransition},
    height ${({ theme }) => theme.timeouts.toggleMenu}ms,
    transform ${({ theme }) => theme.timeouts.toggleMenu}ms;

  * {
    font-family: 'Ubuntu', sans-serif;
  }
`;

const DynamicInner = styled.div`
  /* background must be this for box-shadow to slide with dynamic wrapper */
  background: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ screen, theme }) => theme.contentWidth(screen)};
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ screen, theme }) => theme.headerHeight(screen)};
`;

const Brand = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ screen }) => (screen === 'narrow' ? 1.8 : 2.88)}rem;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const UserLabel = styled.div`
  font-size: ${({ screen }) => (screen === 'narrow' ? 1.4 : 1.6)}rem;
  font-weight: ${({ theme }) => (theme.light ? 500 : 400)};
  text-align: center;
  margin-left: auto;
  margin-right: 0.8rem;
  user-select: none;

  /* critical bits for react-transition-group */
  &.user-label-enter {
    opacity: 0;
  }
  &.user-label-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
  &.user-label-exit {
    opacity: 1;
  }
  &.user-label-exit-active {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
`;

const Welcome = styled.span`
  text-align: center;
  margin-left: auto;

  /* critical bits for react-transition-group */
  &.welcome-enter {
    opacity: 0;
  }
  &.welcome-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
  &.welcome-exit {
    opacity: 1;
  }
  &.welcome-exit-active {
    opacity: 0;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
`;

const MenuButton = styled.button`
  /* must set color this way instead of with usual 'color' prop on FontAwesomeIcon, otherwise styled-components GlobalStyle will override it */
  path {
    fill: ${({ theme }) => theme.colors.primary};
  }

  background: transparent;
  border: none;
  border-radius: 1000px;
  width: 3.8rem;
  height: 3.8rem;
  transition: background 150ms;

  @media (hover: hover) {
    :hover {
      background: rgba(0, 0, 0, 0.06);
    }
  }

  :active {
    background: rgba(0, 0, 0, 0.12);
  }

  ${({ theme }) =>
    theme.dark &&
    css`
      @media (hover: hover) {
        :hover {
          background: rgba(255, 255, 255, 0.06);
        }
      }

      :active {
        background: rgba(255, 255, 255, 0.12);
      }
    `}
`;

function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeUser, setActiveUser] = useState('');

  const { session, requestErrors, justSignedUp } = useContext(SessionContext);
  const { screen } = useContext(ScreenContext);

  const theme = useTheme();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // allows for show/hide and box-shadow render based on scrollY and isMenuOpen
  useEffect(() => {
    const getScrollDirection = () => {
      if (scrollY > window.scrollY) {
        return 'up';
      } else if (scrollY < window.scrollY) {
        return 'down';
      }
    };

    const updateVisibility = () => {
      if (getScrollDirection() === 'down' && !isMenuOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, [scrollY, isMenuOpen]);

  // this ensures UserLabel text doesn't vanish before unmount animation
  useEffect(() => {
    if (!!session) {
      setActiveUser(session.username);
    }
  }, [session]);

  useEffect(() => {
    if (requestErrors.length) {
      setMenuOpen(true); // open menu to reveal request error message
    }
  }, [requestErrors, setMenuOpen]);

  // critical bits for content-based dynamic resizing
  const content = useRef(null);
  const rect = useResizeObserver(content);

  return (
    <>
      <DynamicWrapper
        height={rect.height}
        isHidden={isHidden}
        scrollY={scrollY}
        isMenuOpen={isMenuOpen}
      >
        <DynamicInner ref={content}>
          <Container screen={screen}>
            <Bar screen={screen}>
              <Brand
                screen={screen}
                to={'/'}
                onClick={() => setMenuOpen(false)}
              >
                <span>{'<'}</span>jAsbell<span>{' />'}</span>
              </Brand>
              <CSSTransition
                in={!!session}
                timeout={theme.timeouts.toggleMenu}
                classNames="user-label"
                unmountOnExit
              >
                <UserLabel screen={screen}>
                  <CSSTransition
                    in={justSignedUp}
                    timeout={theme.timeouts.toggleMenu}
                    classNames="welcome"
                    unmountOnExit
                  >
                    <Welcome>Welcome, </Welcome>
                  </CSSTransition>
                  {activeUser}
                </UserLabel>
              </CSSTransition>
              <MenuButton onClick={toggleMenu}>
                <FontAwesomeIcon
                  icon={faBars}
                  size={screen === 'narrow' ? 'xl' : '2x'}
                />
              </MenuButton>
            </Bar>
            <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} />
          </Container>
        </DynamicInner>
      </DynamicWrapper>
    </>
  );
}

export default Header;
