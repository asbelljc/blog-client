import PageWrapper from '../components/PageWrapper';
import styled from 'styled-components';

const Wrapper = styled(PageWrapper)``;

function About() {
  return (
    <Wrapper
      className="about"
      initial={{ opacity: 0 }}
      // animate={{ opacity: 1, transition: { opacity: { delay: 0.3 } } }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>About</div>
    </Wrapper>
  );
}

export default About;
