import { useContext } from 'react';
import { ScreenContext } from '../../../App';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: ${({ screen }) =>
    screen === 'wide' ? 'flex-end' : 'space-around'};

  & > a {
    color: ${({ theme }) => theme.colors.inactive};
    text-decoration: none;
    text-align: ${({ screen }) => (screen === 'wide' ? 'right' : 'left')};
    margin-left: ${({ screen }) => (screen === 'wide' ? '64px' : 0)};

    &.active {
      color: ${({ theme }) => theme.colors.primary};

      &:hover {
        color: ${({ theme }) => theme.colors.primaryGlow};
      }
    }

    &:not(.active):hover {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

export default function Nav() {
  const { screen } = useContext(ScreenContext);

  return (
    <Wrapper screen={screen}>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </Wrapper>
  );
}
