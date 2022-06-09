import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comment from './Comment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    color: ${({ theme }) => theme.colors.inactive};
    margin-bottom: 1rem;
  }

  .none-msg,
  .error-msg {
    font-size: 1.3rem;
  }

  .error-msg {
    color: ${({ theme }) => theme.colors.error};
  }
`;

export default function CommentList({ post }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

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
            edited={comment.edited}
          />
        ))
      ) : !error ? (
        <span className="none-msg">Be the first to comment!</span>
      ) : (
        <span className="error-msg">Something went wrong.</span>
      )}
    </Wrapper>
  );
}
