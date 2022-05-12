import { useContext } from 'react';
import { ScreenContext } from '../App';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Component = styled.main`
  display: flex;
  flex-direction: column;
  width: ${({ screen, theme }) => theme.contentWidth(screen)};
`;

export default function Main({ children }) {
  const { screen } = useContext(ScreenContext);

  return (
    <Wrapper>
      <Component screen={screen}>{children}</Component>
    </Wrapper>
  );
}
