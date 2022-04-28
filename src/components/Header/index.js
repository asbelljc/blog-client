import { useState, useRef, useContext } from 'react';
import { SessionContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
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

const Brand = styled.a`
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  user-select: none;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ActiveUser = styled.span`
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: 8px;
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

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const { session } = useContext(SessionContext);

  const content = useRef(null);
  const rect = useResizeObserver(content);

  const transitionTimeout = 300;

  return (
    <DynamicWrapper height={rect.height}>
      <DynamicInner ref={content}>
        <Bar>
          <Brand href="/">
            code<span>Blog</span>
          </Brand>
          {!session ? null : <ActiveUser>{session.username}</ActiveUser>}
          <MenuButton onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </MenuButton>
        </Bar>
        <CSSTransition
          in={isMenuOpen}
          timeout={transitionTimeout}
          classNames="menu"
          unmountOnExit
        >
          <Menu timeout={transitionTimeout} toggleFn={toggleMenu} />
        </CSSTransition>
      </DynamicInner>
    </DynamicWrapper>
  );
}

export default Header;
