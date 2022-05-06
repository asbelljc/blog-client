import { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import styled, { useTheme } from 'styled-components';
import useResizeObserver from '../../hooks/useResizeObserver';
import Menu from './Menu';

const DynamicWrapper = styled.header`
  position: fixed;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  /* critical bits for dynamic resizing */
  height: ${(props) => props.height}px;
  transition: height 300ms;
`;

const DynamicInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 80px;

  @media screen and (min-width: 800px) {
    & {
      width: min(80%, 1000px);
    }
  }
`;

const Brand = styled(Link)`
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  user-select: none;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const UserLabel = styled.span`
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: 8px;

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

const MenuButton = styled.button`
  /* must set color this way instead of with usual 'color' prop on FontAwesomeIcon, otherwise styled-components GlobalStyle will override it */
  path {
    fill: ${({ theme }) => theme.colors.primary};
  }

  background: transparent;
  border: none;
  border-radius: 1000px;
  width: 38px;
  height: 38px;
  transition: background 150ms;

  :hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :active {
    background: rgba(0, 0, 0, 0.1);
  }
`;

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeUser, setActiveUser] = useState('');

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const { session, requestError } = useContext(SessionContext);

  const theme = useTheme();

  // this ensures UserLabel text doesn't vanish before unmount animation
  useEffect(() => {
    if (!!session) {
      setActiveUser(session.username);
    }
  }, [session]);

  useEffect(() => {
    if (requestError) {
      setMenuOpen(true); // open menu to reveal request error message
    }
  }, [requestError, setMenuOpen]);

  // critical bits for content-based dynamic resizing
  const content = useRef(null);
  const rect = useResizeObserver(content);

  return (
    <DynamicWrapper height={rect.height}>
      <DynamicInner ref={content}>
        <Bar>
          <Brand to="/">
            code<span>Blog</span>
          </Brand>
          <CSSTransition
            in={!!session}
            timeout={theme.timeouts.toggleMenu}
            classNames="user-label"
            unmountOnExit
          >
            <UserLabel>{activeUser}</UserLabel>
          </CSSTransition>
          <MenuButton onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </MenuButton>
        </Bar>
        <Menu isOpen={isMenuOpen} setOpen={setMenuOpen} />
      </DynamicInner>
    </DynamicWrapper>
  );
}

export default Header;
