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
    font-size: 1.6rem;
    text-decoration: none;
    text-align: ${({ screen }) => (screen === 'wide' ? 'right' : 'left')};
    margin-left: ${({ screen }) => (screen === 'wide' ? '6.4rem' : 0)};
    transition: none;

    &.active {
      color: ${({ theme }) => theme.colors.primary};

      &:hover {
        color: ${({ theme }) => theme.colors.primaryGlow};
      }
    }

    &:not(.active):hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export default function Nav({ setMenuOpen }) {
  const { screen } = useContext(ScreenContext);

  const linkNames = ['About', 'Portfolio', 'Blog', 'Contact'];

  return (
    <Wrapper screen={screen}>
      {linkNames.map((name, index) => {
        const path = `/${name.toLowerCase()}`;

        return (
          <NavLink key={index} to={path} onClick={() => setMenuOpen(false)}>
            {name}
          </NavLink>
        );
      })}
    </Wrapper>
  );
}
