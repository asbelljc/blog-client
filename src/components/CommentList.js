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

export default function CommentList({ comments, error, onDelete }) {
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
            onDelete={() => onDelete(comment._id)}
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
