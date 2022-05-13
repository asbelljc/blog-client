import { motion } from 'framer-motion';
import styled from 'styled-components';

export default styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${({ theme, screen }) => theme.headerHeight(screen)};
`;
