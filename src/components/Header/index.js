import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled, { useTheme } from 'styled-components';
import Menu from './Menu';

const OuterHeader = styled.header`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InnerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 100%;

  @media screen and (min-width: 800px) {
    & {
      width: min(80%, 1000px);
    }
  }

  a {
    font-size: 32px;
    font-weight: bold;
    text-decoration: none;
    user-select: none;
  }
`;

const MenuButton = styled.button`
  /* must set color this way instead of with usual 'color' prop on FontAwesomeIcon, otherwise styled-components GlobalStyle will override it */
  path {
    fill: ${({ theme }) => theme.colors.blue};
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
  const theme = useTheme();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <>
      <OuterHeader>
        <InnerHeader>
          <a href="/">
            code<span style={{ color: `${theme.colors.blue}` }}>Blog</span>
          </a>
          <MenuButton onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </MenuButton>
        </InnerHeader>
      </OuterHeader>
      {isMenuOpen ? <Menu /> : null}
    </>
  );
}

export default Header;
