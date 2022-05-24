import { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ScreenContext } from '../App';

const Component = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme, screen }) => theme.headerHeight(screen)};
`;

const defaultVariant = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: {
      opacity: { delay: 0.5 },
    },
  },
  exit: { opacity: 0 },
};

export default function PageWrapper({
  variants = defaultVariant,
  initial = 'hidden',
  animate = 'shown',
  exit = 'exit',
  ...props
}) {
  const { screen } = useContext(ScreenContext);

  // ensures page change restores view to top of content
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Component
      screen={screen}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      {...props}
    />
  );
}
