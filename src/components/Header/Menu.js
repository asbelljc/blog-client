import { useContext } from 'react';
import { SessionContext, ScreenContext } from '../../App';
import styled from 'styled-components';

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
      <h1>test</h1>
    </>
  );
}

export default Menu;
