import { useState, useContext } from 'react';
import { SessionContext } from '../../App';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  gap: 8px;
  width: min(90%, 500px);
  min-height: 60px;
  padding: 24px 12px;

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
      flex-direction: row;
      align-items: center;
    }
  }

  /* critical bits for react-transition-group */
  transform-origin: top;
  &.menu-enter {
    transform: scaleY(0);
  }
  &.menu-enter-active {
    transform: scaleY(1);
    transition: transform ${(props) => props.timeout}ms;
  }
  &.menu-exit {
    opacity: 1;
  }
  &.menu-exit-active {
    opacity: 0;
    transition: opacity ${(props) => props.timeout}ms;
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
  text-align: center;
`;

const LoginField = styled.input`
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.08);
`;

function Menu({ timeout, toggleFn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { session, login, logout } = useContext(SessionContext);

  // helps sync close animation with login/logout process
  const hideAndThen = (callback) => {
    toggleFn();
    setTimeout(callback, timeout);
  };

  return (
    <Wrapper timeout={timeout}>
      {!session ? (
        <>
          <LoginField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <LoginField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <UserButton
            onClick={() => {
              hideAndThen(() => login(username, password));
            }}
          >
            Log In
          </UserButton>
          <UserButton solid>Sign Up</UserButton>
        </>
      ) : (
        <>
          <Greeting>Hello, {session.username}!</Greeting>
          {session.status === 'admin' ? (
            <UserButton solid>New Post</UserButton>
          ) : null}
          <UserButton
            onClick={() => {
              hideAndThen(logout);
            }}
          >
            Log Out
          </UserButton>
        </>
      )}
    </Wrapper>
  );
}

export default Menu;
