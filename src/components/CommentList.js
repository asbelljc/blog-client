import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { SessionContext } from '../App';
import Comment from './Comment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: ${({ theme }) => theme.colors.inactive};
    margin-bottom: 1rem;
  }
`;

export default function CommentList({ post }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  const { session } = useContext(SessionContext);

  useEffect(() => {
    async function getComments() {
      try {
        const { data } = await axios.get(`/posts/${post._id}/comments`, {
          timeout: 10000,
        });

        setComments(data.comments);
      } catch {
        setError(true);
      }
    }

    if (post) {
      getComments();
    }
  }, [post]);

  return (
    <Wrapper>
      <h2>Comments</h2>
      {comments.length && !error ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            id={comment._id}
            post={comment.post}
            username={comment.user.username}
            dateTime={comment.date_time_formatted}
            body={comment.body}
            canEdit={
              !!session &&
              (comment.user.username === session.username ||
                session.status === 'admin')
            }
          />
        ))
      ) : !error ? (
        <span>Be the first to comment!</span>
      ) : (
        <span>Something went wrong.</span>
      )}
    </Wrapper>
  );
}
