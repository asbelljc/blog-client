import styled from 'styled-components';

export default styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme, solid }) =>
    (solid && theme.colors.primary) || 'none'};
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  color: ${({ theme, solid }) => (solid && '#FFF') || theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 500;
  transition: background 150ms;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primaryGlow};
    background: ${({ theme, solid }) =>
      (solid && theme.colors.primaryGlow) || theme.colors.primaryTint};
    color: ${({ theme, solid }) =>
      (solid && '#FFF') || theme.colors.primaryGlow};
  }
`;
