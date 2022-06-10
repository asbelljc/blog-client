import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { SessionContext } from '../App';

export default function CommentSection({ post }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [listError, setListError] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const { session } = useContext(SessionContext);

  useEffect(() => {
    async function getComments() {
      try {
        const { data } = await axios.get(`/posts/${post._id}/comments`, {
          timeout: 10000,
        });

        setComments(data.comments);
      } catch {
        setListError(true);
      }
    }

    if (post) {
      getComments();
    }
  }, [post]);

  // this clears out any success/error/loading messages if you log out and log back in
  useEffect(() => {
    setBody('');
    setSending(false);
    setSuccess(false);
    setListError(false);
    setValidationError(false);
    setSubmissionError(false);
  }, [session]);

  const validate = () => {
    setSubmissionError(false);

    if (!body.trim()) {
      setValidationError(true);
      return false;
    } else {
      setValidationError(false);
      return true;
    }
  };

  const validateAndSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setSubmissionError(false);

    const isCommentValid = validate();

    if (!isCommentValid) {
      return;
    } else {
      setSending(true);

      try {
        const { data } = await axios.post(
          `/posts/${post._id}/comments`,
          {
            body,
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

        setSending(false);
        setSuccess(true);
        setBody('');
        setComments([data.newComment, ...comments]);
      } catch (error) {
        setSending(false);
        setSubmissionError(true);
      }
    }
  };

  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment._id !== id));
  };

  return (
    <>
      <CommentForm
        body={body}
        onSetBody={setBody}
        onSubmit={validateAndSubmit}
        sending={sending}
        success={success}
        validationError={validationError}
        submissionError={submissionError}
      />
      <CommentList
        comments={comments}
        error={listError}
        onDelete={deleteComment}
      />
    </>
  );
}
