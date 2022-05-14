import { Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

export default function AnimatedRoutes({ location, routesKey, ...props }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={routesKey} {...props} />
    </AnimatePresence>
  );
}
