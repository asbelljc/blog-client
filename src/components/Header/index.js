import Menu from './Menu';
import styled from 'styled-components';

const OuterHeader = styled.header`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InnerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 100%;

  @media screen and (min-width: 800px) {
    & {
      width: min(80%, 1000px);
    }
  }
`;

function Header() {
  return (
    <OuterHeader>
      <InnerHeader>
        <h1>
          code<span style={{ color: 'rgb(30, 130, 255)' }}>Blog</span>
        </h1>
        <Menu />
      </InnerHeader>
    </OuterHeader>
  );
}

export default Header;
