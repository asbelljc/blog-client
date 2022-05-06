import { useState, useContext } from 'react';
import { SessionContext } from '../../../App';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import UserControls from './UserControls';

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

const ErrorMessage = styled.div`
  height: fit-content;
  margin: -16px 0 16px 0;

  div {
    font-size: 12px;
    text-align: center;
    color: ${({ theme }) => theme.colors.error};
  }
`;

function Menu({ isOpen, toggleFn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { session, login, logout } = useContext(SessionContext);

  const timeout = 300; // timeout (ms) for open/close animation

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
    <CSSTransition
      in={isOpen}
      timeout={timeout}
      classNames="menu"
      unmountOnExit
    >
      <Wrapper timeout={timeout}>
        <UserControls
          session={session}
          username={username}
          usernameError={usernameError}
          onChangeUsername={(e) => setUsername(e.target.value)}
          onBlurUsername={validateUsername}
          password={password}
          onChangePassword={(e) => setPassword(e.target.value)}
          onBlurPassword={validatePassword}
          onClickLogin={() => {
            hideAndThen(() => login(username, password));
          }}
          onClickLogout={() => {
            hideAndThen(logout);
          }}
        />
        <ErrorMessage>
          {usernameError ? <div>Username must not be blank.</div> : null}
          {passwordError ? (
            <div>Password must be at least 8 characters.</div>
          ) : null}
        </ErrorMessage>
      </Wrapper>
    </CSSTransition>
  );
}

export default Menu;
