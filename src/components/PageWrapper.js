import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useContext } from 'react';
import { ScreenContext } from '../App';

const Component = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme, screen }) => theme.headerHeight(screen)};
`;

export default function PageWrapper(props) {
  const { screen } = useContext(ScreenContext);

  return <Component screen={screen} {...props} />;
}
