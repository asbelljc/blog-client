import { useContext } from 'react';
import { SessionContext, ScreenContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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

const UserButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  transition: background 150ms;

  &:hover {
    background: ${({ theme }) => theme.colors.blueGlow};
  }
`;

function Menu() {
  const { session } = useContext(SessionContext);
  const { isDesktop } = useContext(ScreenContext);

  return (
    <>
      <MenuButton>
        <FontAwesomeIcon icon={faBars} size="xl" />
      </MenuButton>
    </>
  );
}

export default Menu;
