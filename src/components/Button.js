import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const styles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme, solid }) =>
    (solid && theme.colors.primary) || 'none'};
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  color: ${({ theme, solid }) => (solid && '#FFF') || theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 150ms;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primaryGlow};
    background: ${({ theme, solid }) =>
      (solid && theme.colors.primaryGlow) || theme.colors.primaryTint};
    color: ${({ theme, solid }) =>
      (solid && '#FFF') || theme.colors.primaryGlow};
  }
`;

const Button = styled.button`
  ${styles}
`;
const LinkButton = styled(Link)`
  ${styles}
`;

export default function Component({ link, solid, ...rest }) {
  // Link doesn't want 'solid' prop as boolean, so convert it to a number
  const solidAsNum = +solid;

  return (
    <>
      {link ? (
        <LinkButton solid={solidAsNum} {...rest} />
      ) : (
        <Button solid={solidAsNum} {...rest} />
      )}
    </>
  );
}
