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
  &.contact-error-enter {
    opacity: 0;
  }
  &.contact-error-enter-active {
    opacity: 1;
    transition: opacity ${({ theme }) => theme.timeouts.toggleMenu}ms;
  }
`;

export default function ErrorMessages({
  nameError,
  emailError,
  messageError,
  submissionError,
}) {
  const theme = useTheme();

  return (
    <CSSTransition
      in={nameError || emailError || messageError || submissionError}
      timeout={theme.timeouts.toggleMenu}
      classNames="contact-error"
      unmountOnExit
    >
      <Wrapper>
        {nameError && <div key={'nameError'}>Name cannot be empty.</div>}
        {emailError && (
          <div key={'emailError'}>Please enter a valid email.</div>
        )}
        {messageError && <div key={'msgError'}>Message cannot be empty.</div>}
        {submissionError && (
          <div key={'requestError'}>Something went wrong.</div>
        )}
      </Wrapper>
    </CSSTransition>
  );
}
