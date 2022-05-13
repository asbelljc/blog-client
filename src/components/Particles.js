import TsParticles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useTheme } from 'styled-components';

export default function Particles({ loaded }) {
  const theme = useTheme();

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <TsParticles
      id="tsparticles"
      init={particlesInit}
      loaded={loaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          opacity: 0,
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 75,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: theme.light ? theme.colors.primary : theme.colors.text,
          },
          links: {
            color: theme.colors.text,
            distance: 150,
            enable: true,
            opacity: theme.light ? 0.1 : 0.2,
            width: 0.5,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'out',
            },
            random: false,
            speed: 0.25,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 10,
            },
            value: 1,
          },
          opacity: {
            value: theme.light ? 0.2 : 0.3,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
