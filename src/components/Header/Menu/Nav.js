import { useContext } from 'react';
import { ScreenContext } from '../../../App';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  & > a {
    text-decoration: none;

    &.active {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      text-decoration: underline ${({ theme }) => theme.colors.primary};
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
