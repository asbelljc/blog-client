import { useContext } from 'react';
import { SessionContext, ScreenContext } from '../../App';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 90%;
  height: 60px;

  /* horizonatal divider at top */
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

  @media screen and (min-width: 800px) {
    & {
      width: min(80%, 1000px);
    }
  }
`;

const UserButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.blue};
  background: ${(props) => (props.solid && props.theme.colors.blue) || 'none'};
  border-radius: 5px;
  padding: 10px 20px;
  color: ${(props) =>
    (props.solid && props.theme.colors.white) || props.theme.colors.blue};
  font-weight: bold;
  transition: background 150ms;
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blueGlow};
    background: ${(props) =>
      (props.solid && props.theme.colors.blueGlow) || 'none'};
    color: ${(props) =>
      (props.solid && props.theme.colors.white) || props.theme.colors.blueGlow};
  }
`;

const Greeting = styled.span`
  display: block;
`;

const LoginField = styled.input``;

function Menu() {
  const { session, login, logout } = useContext(SessionContext);
  const { isDesktop } = useContext(ScreenContext);

  return (
    <Wrapper>
      {!session ? (
        <>
          <LoginField type="text" placeholder="Username" />
          <LoginField type="password" placeholder="Password" />
          <UserButton>Log In</UserButton>
          <UserButton solid>Sign Up</UserButton>
        </>
      ) : (
        <>
          <Greeting>Hello, {session.username}!</Greeting>
          {session.status === 'admin' ? (
            <UserButton solid>New Post</UserButton>
          ) : null}
          <UserButton>Log Out</UserButton>
        </>
      )}
    </Wrapper>
  );
}

export default Menu;
