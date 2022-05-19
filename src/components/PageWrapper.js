import { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ScreenContext } from '../App';

const Component = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme, screen }) => theme.headerHeight(screen)};
`;

export default function PageWrapper(props) {
  const { screen } = useContext(ScreenContext);

  // ensures page change restores view to top of content
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Component screen={screen} {...props} />;
}
