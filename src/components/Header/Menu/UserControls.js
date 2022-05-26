import { useState, useEffect, useContext } from 'react';
import { SessionContext, ScreenContext } from '../../../App';
import styled, { css, useTheme } from 'styled-components';
import ErrorMessages from './ErrorMessages';
import Button from '../../Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem; /* gap between controls and error messages */
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: ${({ screen }) => (screen === 'narrow' ? 'column' : 'row')};
  align-items: ${({ screen }) => (screen === 'narrow' ? 'stretch' : 'center')};
  justify-content: flex-end;
  gap: 0.8rem;
`;

const UserButton = styled(Button)`
  min-width: 9.3rem;
  font-size: 1.3rem;
`;

const LoginField = styled.input`
  height: 3.2rem;
  /* this keeps it from being too wide on desktops */
  flex-grow: ${({ screen }) => (screen === 'medium' ? 1 : 0)};
  min-width: 0; /* this lets it flex-shrink properly */
  padding: 0 0.8rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) =>
    theme.dark ? 'rgba(0, 0, 0, 0.16)' : 'rgba(0, 0, 0, 0.08)'};
  font-size: 1.4rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }

  ${({ error }) =>
    error &&
    css`
      outline: 1px solid ${({ theme }) => theme.colors.error};
    `};
`;

// TODO: add forgot password functionality! (with JWT / one-time reset link)
export default function UserControls({ setMenuOpen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { session, requestErrors, setRequestErrors, signup, login, logout } =
    useContext(SessionContext);

  const { screen } = useContext(ScreenContext);

  const theme = useTheme();

  useEffect(() => {
    if (requestErrors.length) {
      // request error takes precedence over un/pw errors, so hide those
      setUsernameError(false);
      setPasswordError(false);
    }
  }, [requestErrors]);

  const validateUsername = () => {
    // if there was a request error before, user no longer needs to see it
    setRequestErrors([]);

    const isBadLength =
      username.trim().length < 1 || username.trim().length > 12;
    const hasSpaces = username.trim().includes(' ');

    if (isBadLength || hasSpaces) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const validatePassword = () => {
    // if there was a request error before, user no longer needs to see it
    setRequestErrors([]);

    const isBadLength =
      password.trim().length < 8 || password.trim().length > 48;

    if (isBadLength) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  // HOF to sync close animation with login/logout/signup process
  const closeMenuThen = (callback) => {
    setMenuOpen(false);
    setTimeout(callback, theme.timeouts.toggleMenu);
  };

  // HOF to validate before submitting login/signup request
  const validateThen = (callback) => {
    validateUsername();
    validatePassword();
    if (usernameError || passwordError) {
      return;
    } else {
      closeMenuThen(callback);
    }
  };

  return (
    <Wrapper>
      <ControlsContainer screen={screen}>
        {!session ? (
          <>
            <LoginField
              error={usernameError}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={validateUsername}
              screen={screen}
            />
            <LoginField
              error={passwordError}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              screen={screen}
            />
            <UserButton
              onClick={() => validateThen(() => login(username, password))}
            >
              Log In
            </UserButton>
            <UserButton
              solid
              onClick={() => validateThen(() => signup(username, password))}
            >
              Sign Up
            </UserButton>
          </>
        ) : (
          <>
            {session.status === 'admin' && (
              <UserButton solid>New Post</UserButton>
            )}
            {/* TODO: Add logic to redirect to Home if on protected page when logging out */}
            <UserButton onClick={() => closeMenuThen(logout)}>
              Log Out
            </UserButton>
          </>
        )}
      </ControlsContainer>
      <ErrorMessages
        usernameError={usernameError}
        passwordError={passwordError}
        requestErrors={requestErrors}
      />
    </Wrapper>
  );
}
