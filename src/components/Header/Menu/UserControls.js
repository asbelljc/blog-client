import styled, { css } from 'styled-components';

const Wrapper = styled.div`
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

export default function UserControls({
  session,
  username,
  usernameError,
  onChangeUsername,
  onBlurUsername,
  password,
  passwordError,
  onChangePassword,
  onBlurPassword,
  onClickLogin,
  onClickLogout,
}) {
  return (
    <Wrapper>
      {!session ? (
        <>
          <LoginField
            error={usernameError}
            type="text"
            placeholder="Username"
            value={username}
            onChange={onChangeUsername}
            onBlur={onBlurUsername}
          />
          <LoginField
            error={passwordError}
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
            onBlur={onBlurPassword}
          />
          <UserButton onClick={onClickLogin}>Log In</UserButton>
          <UserButton solid>Sign Up</UserButton>
        </>
      ) : (
        <>
          {session.status === 'admin' ? (
            <UserButton solid>New Post</UserButton>
          ) : null}
          <UserButton onClick={onClickLogout}>Log Out</UserButton>
        </>
      )}
    </Wrapper>
  );
}
