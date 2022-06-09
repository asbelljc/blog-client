import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function CommentSection({ post }) {
  return (
    <>
      <CommentForm post={post} />
      <CommentList post={post} />
    </>
  );
}
