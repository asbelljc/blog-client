import { useState, useContext } from 'react';
import { SessionContext } from '../../App';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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

const UserControls = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  gap: 8px;
  width: min(90%, 500px);
  min-height: 60px;
  padding: 32px 12px;

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
`;

const UserButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${(props) =>
    (props.solid && props.theme.colors.primary) || 'none'};
  border-radius: 5px;
  padding: 10px 20px;
  color: ${(props) =>
    (props.solid && props.theme.colors.white) || props.theme.colors.primary};
  font-weight: bold;
  transition: background 150ms;
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primaryGlow};
    background: ${(props) =>
      (props.solid && props.theme.colors.primaryGlow) || 'none'};
    color: ${(props) =>
      (props.solid && props.theme.colors.white) ||
      props.theme.colors.primaryGlow};
  }
`;

const LoginField = styled.input`
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.08);

  ${(props) =>
    props.error &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.error};
    `};
`;

const ErrorMessage = styled.div`
  height: fit-content;
  margin: -16px 0 16px 0;

  div {
    font-size: 12px;
    text-align: center;
    color: ${({ theme }) => theme.colors.error};
  }
`;

function Menu({ timeout, toggleFn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { session, login, logout } = useContext(SessionContext);

  // helps sync close animation with login/logout process
  const hideAndThen = (callback) => {
    toggleFn();
    setTimeout(callback, timeout);
  };

  const validateUsername = () => {
    !username.trim() ? setUsernameError(true) : setUsernameError(false);
  };

  const validatePassword = () => {
    password.trim().length < 8
      ? setPasswordError(true)
      : setPasswordError(false);
  };

  return (
    <Wrapper timeout={timeout}>
      <UserControls>
        {!session ? (
          <>
            <LoginField
              error={usernameError}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={validateUsername}
            />
            <LoginField
              error={passwordError}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
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
      </UserControls>
      <ErrorMessage>
        {usernameError ? <div>Username must not be blank.</div> : null}
        {passwordError ? (
          <div>Password must be at least 8 characters.</div>
        ) : null}
      </ErrorMessage>
    </Wrapper>
  );
}

export default Menu;
