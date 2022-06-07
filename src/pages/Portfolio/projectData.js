import portfolioSiteThumbnail from '../../assets/portfolio/portfolioSite/thumbnail.jpg';
import resumeBuilderThumbnail from '../../assets/portfolio/resumeBuilder/thumbnail.jpg';
import weatherAppThumbnail from '../../assets/portfolio/weatherApp/thumbnail.jpg';
import libraryThumbnail from '../../assets/portfolio/library/thumbnail.jpg';
import ticTacToeThumbnail from '../../assets/portfolio/ticTacToe/thumbnail.jpg';
import reactWordpressThumbnail from '../../assets/portfolio/reactWordpress/thumbnail.jpg';

const projects = [
  {
    title: 'Portfolio / Blog Site',
    description: `The website you're on now! The UI is built with <strong>React</strong> and <strong>React Router</strong> and uses <strong>Styled Components</strong>, <strong>Framer Motion</strong>, <strong>React Flip Move</strong>, and <strong>React Transition Group</strong> to offer an immersive user experience. The backend is built with <strong>Node</strong>, <strong>Express</strong>, and <strong>MongoDB</strong> and uses <strong>Passport.js</strong> to provide user sessions and a custom content management system.`,
    thumbnailPath: portfolioSiteThumbnail,
    thumbnailAlt: 'Screenshot of a blog page showing a list of posts.',
    repoUrl: 'https://github.com/asbelljc/portfolio-site',
    demoUrl: '#',
  },
  {
    title: 'Resume Builder',
    description: `Converts user-entered resume data into a nicely-styled document. Built with <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Styled Components</strong>, it uses <strong>ReactToPrint</strong> to let users download a pdf of their finished resume.`,
    thumbnailPath: resumeBuilderThumbnail,
    thumbnailAlt:
      'Screenshot of a resume-building web app, with example data shown in a styled template.',
    repoUrl: 'https://github.com/asbelljc/resume-builder',
    demoUrl: 'https://asbelljc.github.io/resume-builder',
  },
  {
    title: 'Weather App',
    description: `Presents current weather data from the <strong>OpenWeatherMap API</strong> in a slick, <strong>glass-themed UI</strong> with data-reactive images. Makes strategic use of sequential API calls to augment and clean data. Built with <strong>JavaScript</strong>, <strong>Sass</strong>, and a custom <strong>Webpack</strong> configuration.`,
    thumbnailPath: weatherAppThumbnail,
    thumbnailAlt:
      'Screenshot of a weather app, showing example data from New York City.',
    repoUrl: 'https://github.com/asbelljc/weather-app',
    demoUrl: 'https://asbelljc.github.io/weather-app',
  },
  {
    title: 'Library',
    description: `An app for recording and tracking progress in your book collection. With a few <strong>CSS</strong> hacks and the help of the <strong>AnimateCSSGrid</strong> library, it presents an experimental UI built on <strong>neumorphic design</strong> principles.`,
    thumbnailPath: libraryThumbnail,
    thumbnailAlt:
      'Screenshot of a library tracking app, showing a list of arbitrary books as an example.',
    repoUrl: 'https://github.com/asbelljc/library',
    demoUrl: 'https://asbelljc.github.io/library',
  },
  {
    title: 'Tic Tac Toe',
    description: `The classic game, built with vanilla <strong>JavaScript</strong> in the <strong>Module Pattern</strong> design strategy. Uses the recursive <strong>minimax algorithm</strong>, famous for its use in chess programs, to present an <strong>AI</strong> with variable difficulty - unbeatable in hard mode!`,
    thumbnailPath: ticTacToeThumbnail,
    thumbnailAlt:
      'Screenshot of a Tic Tac Toe game app, showing a game in progress.',
    repoUrl: 'https://github.com/asbelljc/tic-tac-toe',
    demoUrl: 'https://asbelljc.github.io/tic-tac-toe',
  },
  {
    title: 'React / WordPress Integration',
    description: `An experiment in using <strong>WordPress</strong> as a <strong>headless CMS</strong>. Uses the <strong>Frontity</strong> framework, which enables developers to build front-ends for WordPress sites using <strong>React</strong>, <strong>React-Router</strong>, and <strong>Emotion</strong>.`,
    thumbnailPath: reactWordpressThumbnail,
    thumbnailAlt:
      'Screenshot of a blog page, showing a sample post with an image of a waterfall.',
    repoUrl: 'https://github.com/asbelljc/hello-frontity',
    demoUrl: 'https://asbelljc-hello-frontity.herokuapp.com/',
  },
];

export default projects;
