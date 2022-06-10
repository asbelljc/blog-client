import { useContext } from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import { ScreenContext, SessionContext } from '../App';
import { CSSTransition } from 'react-transition-group';
import { useTheme } from 'styled-components';
import Loader from './Loader';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: ${({ screen }) =>
    screen === 'wide'
      ? '1.6rem 6.4rem 4.8rem 6.4rem'
      : screen === 'medium'
      ? '0 1.6rem 3.2rem 1.6rem'
      : '0 0 3.2rem 0'};
`;

const Input = styled.textarea`
  resize: none;
  flex-grow: 1;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) =>
    theme.dark ? 'rgba(0, 0, 0, 0.16)' : 'rgba(0, 0, 0, 0.08)'};
  font-family: 'Roboto Mono', monospace;
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

const SubmitButton = styled(Button)`
  font-size: 1.3rem;
  padding: 0.6rem 1.2rem;
  align-self: ${({ screen }) =>
    screen === 'narrow' ? 'stretch' : 'flex-start'};
`;

const LoginMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.inactive};
  margin-bottom: 3.2rem;
`;

const SuccessMessage = styled.div`
  height: fit-content;
  margin-bottom: 0.4rem;
  font-size: 1.2rem;
  text-align: center;

  /* critical bits for react-transition-group */
  &.success-enter {
    opacity: 0;
  }
  &.success-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
`;

const ErrorMessage = styled.div`
  height: fit-content;
  margin-bottom: 0.4rem;
  font-size: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.error};

  /* critical bits for react-transition-group */
  &.error-enter {
    opacity: 0;
  }
  &.error-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
`;

export default function CommentForm({
  body,
  onSetBody,
  onSubmit,
  sending,
  success,
  validationError,
  submissionError,
}) {
  const { screen } = useContext(ScreenContext);
  const { session } = useContext(SessionContext);

  const theme = useTheme();

  return (
    <>
      {sending ? (
        <Loader />
      ) : !session ? (
        <LoginMessage>You must be logged in to comment.</LoginMessage>
      ) : (
        <>
          <CSSTransition
            in={validationError || submissionError}
            timeout={theme.timeouts.toggleMenu}
            classNames="error"
            unmountOnExit
          >
            <ErrorMessage>
              {validationError
                ? 'Comment cannot be blank.'
                : 'Something went wrong.'}
            </ErrorMessage>
          </CSSTransition>
          <CSSTransition
            in={success}
            timeout={theme.timeouts.toggleMenu}
            classNames="success"
            unmountOnExit
          >
            <SuccessMessage>Thanks for commenting!</SuccessMessage>
          </CSSTransition>
          <Container screen={screen} onSubmit={onSubmit}>
            <Input
              rows="10"
              placeholder="Leave a comment"
              error={validationError}
              value={body}
              onChange={(e) => onSetBody(e.target.value)}
            />
            <SubmitButton screen={screen} solid>
              Submit
            </SubmitButton>
          </Container>
        </>
      )}
    </>
  );
}
