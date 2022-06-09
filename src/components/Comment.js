import axios from 'axios';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { SessionContext } from '../App';
import useTimeout from '../hooks/useTimeout';

const Container = styled.div`
  padding: 1.6rem;
  margin: 0.5rem 0;
  background: ${({ theme }) => theme.colors.inactiveTint};

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0 0 0.3rem 0;
    font-size: 1.8rem;
  }

  span {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.inactive};
  }

  p {
    padding: 0.5rem 0 0 0;
  }

  textarea {
    display: block;
    background: none;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    border-radius: 0.4rem;
    width: 100%;
    margin: 0.5rem 0 0 0;
    padding: 0.3rem;
    font-size: 1.6rem;
    resize: none;

    &:focus {
      outline: 0.1rem solid ${({ theme }) => theme.colors.primaryGlow};
    }
  }

  .loading {
    padding: 0.5rem 0 0 0;
    display: block;
    color: ${({ theme }) => theme.colors.inactive};
    font-style: italic;
  }

  .error {
    padding: 0.5rem 0 0 0;
    display: block;
    color: ${({ theme }) => theme.colors.error};
    font-style: italic;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.inactive};
  padding-top: 0.8rem;
  font-size: 1.1rem;
  line-height: 1;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    font-size: 1.1rem;
    line-height: 1;
    color: ${({ theme }) => theme.colors.inactive};
    transition: none;

    &.undo-delete {
      color: ${({ theme }) => theme.colors.error};
      font-weight: 500;
    }

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default function Comment({
  id,
  post,
  username,
  dateTime,
  body,
  edited,
}) {
  const [commentBody, setCommentBody] = useState(body);

  const [editing, setEditing] = useState(false);
  const [hasBeenEdited, setHasBeenEdited] = useState(edited);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState(false);
  const [error, setError] = useState(false);

  const { session } = useContext(SessionContext);

  const canEdit =
    !!session && (username === session.username || session.status === 'admin');

  const startEditing = () => {
    setError(false);
    setEditing(true);
  };

  const cancelEditing = () => {
    setCommentBody(body);
    setEditing(false);
  };

  const submitEdit = async () => {
    setEditing(false);
    setLoading(true);

    try {
      await axios.put(
        `/posts/${post}/comments/${id}`,
        {
          body: commentBody,
          user: username,
          post,
        },
        {
          withCredentials: true,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      setLoading(false);
      setError(false);
      setHasBeenEdited(true);
    } catch {
      setLoading(false);
      setError(true);
      setCommentBody(body);
    }
  };

  const deleteComment = async () => {
    setWillBeDeleted(false);
    setLoading(true);

    try {
      await axios.delete(`/posts/${post}/comments/${id}`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      setLoading(false);
      setError(false);
      setDeleted(true);
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  useTimeout(deleteComment, willBeDeleted ? 10000 : null);

  return (
    <>
      {!deleted && (
        <Container>
          <h4>{username}</h4>
          <span>
            {dateTime}
            {hasBeenEdited && ' (edited)'}
          </span>
          {editing ? (
            <textarea
              autoFocus
              rows="8"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            />
          ) : !loading && !error ? (
            <p>{commentBody}</p>
          ) : !error ? (
            <span className="loading">Loading...</span>
          ) : (
            <span className="error">Something went wrong.</span>
          )}
          {canEdit && !loading ? (
            <Controls>
              {editing ? (
                <>
                  <button onClick={cancelEditing}>Cancel</button>
                  {' | '}
                  <button onClick={submitEdit}>Submit</button>
                </>
              ) : willBeDeleted ? (
                <>
                  {'Comment will be deleted | '}
                  <button
                    className="undo-delete"
                    onClick={() => setWillBeDeleted(false)}
                  >
                    Undo
                  </button>
                </>
              ) : (
                <>
                  <button onClick={startEditing}>Edit</button>
                  {' | '}
                  <button onClick={() => setWillBeDeleted(true)}>Delete</button>
                </>
              )}
            </Controls>
          ) : null}
        </Container>
      )}
    </>
  );
}
