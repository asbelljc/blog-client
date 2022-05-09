import { CSSTransition } from 'react-transition-group';
import styled, { useTheme } from 'styled-components';

const Wrapper = styled.div`
  height: fit-content;
  margin: 0;

  div {
    font-size: 1.2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.error};
  }

  /* critical bits for react-transition-group */
  transform-origin: top;
  &.error-enter {
    transform: scaleY(0);
  }
  &.error-enter-active {
    transform: scaleY(1);
    transition: transform ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
`;

export default function ErrorMessages({
  usernameError,
  passwordError,
  requestErrors,
}) {
  const theme = useTheme();

  return (
    <CSSTransition
      in={usernameError || passwordError || !!requestErrors.length}
      timeout={theme.timeouts.toggleMenu}
      classNames="error"
      unmountOnExit
    >
      <Wrapper>
        {usernameError && (
          <div key={'unError'}>
            Username must be 1-12 characters (no spaces).
          </div>
        )}
        {passwordError && (
          <div key={'pwError'}>Password must be 8-48 characters.</div>
        )}
        {requestErrors.map((error) => (
          <div key={error}>{error}</div>
        ))}
      </Wrapper>
    </CSSTransition>
  );
}
