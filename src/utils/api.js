import axios from 'axios';
import { DateTime } from 'luxon';

export const apiURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? ''
    : process.env.REACT_APP_API_URL;

// TODO: Extract api-call logic the *right* way - with hooks

// App.js stuff

export async function syncSession() {
  const { data } = await axios.get(`${apiURL}/auth/session`, {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
    timeout: 10000, // wait up to 10s for response
  });

  return data.session;
}

export async function signup(username, password) {
  const { data } = await axios.post(
    `${apiURL}/auth/signup`,
    {
      username,
      password,
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

  return data.session;
}

export async function login(username, password) {
  const { data } = await axios.post(
    `${apiURL}/auth/login`,
    {
      username,
      password,
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

  return data.session;
}

export async function logout() {
  await axios.post(`${apiURL}/auth/logout`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
}

// Comment.js stuff

export async function submitEdit(commentBody, username, postId, commentId) {
  await axios.put(
    `${apiURL}/posts/${postId}/comments/${commentId}`,
    {
      body: commentBody,
      user: username,
      post: postId,
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
}

export async function deleteComment(postId, commentId) {
  await axios.delete(`${apiURL}/posts/${postId}/comments/${commentId}`, {
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
}

// CommentSection.js stuff

export async function getComments(post) {
  const { data } = await axios.get(`${apiURL}/posts/${post._id}/comments`, {
    timeout: 10000,
  });

  return data.comments;
}

export async function submitComment(commentBody, post, existingComments) {
  const { data } = await axios.post(
    `${apiURL}/posts/${post._id}/comments`,
    {
      body: commentBody,
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

  return [data.newComment, ...existingComments];
}

// Blog list stuff

export async function getPosts() {
  const { data } = await axios.get(`${apiURL}/posts`, { timeout: 10000 });

  const postList = await data.posts.map((post) => ({
    ...post,
    date: DateTime.fromISO(post.date_time).toLocaleString(DateTime.DATE_MED),
  }));

  return postList;
}

// Blog post stuff

export async function getPost(slug) {
  const { data } = await axios.get(`${apiURL}/posts/${slug}`, {
    timeout: 10000,
  });

  const post = {
    ...data.post,
    date_time: DateTime.fromISO(data.post.date_time).toLocaleString(
      DateTime.DATETIME_MED
    ),
  };

  return post;
}
