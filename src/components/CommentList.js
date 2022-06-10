import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Comment from './Comment';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.inactive};
  margin-bottom: 1rem;
`;

const NoneMsg = styled.span`
  font-size: 1.3rem;
`;

const ErrorMsg = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.error};
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
      <Heading>Comments</Heading>
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
        <NoneMsg>Be the first to comment!</NoneMsg>
      ) : (
        <ErrorMsg>Something went wrong.</ErrorMsg>
      )}
    </Wrapper>
  );
}
