import { useContext } from 'react';
import { SessionContext, ScreenContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled, { ThemeContext } from 'styled-components';

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
  const theme = useContext(ThemeContext); // need this to use theme with NON-styled-component

  return (
    <>
      <FontAwesomeIcon icon={faBars} size="xl" color={theme.colors.blue} />
    </>
  );
}

export default Menu;
