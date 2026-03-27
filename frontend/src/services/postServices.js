

// Replace all with real API calls later

export const getPosts = async () => {
  // return fetch("/posts")
  return dummyPosts;
};

export const createPost = async (post) => {
  // return fetch("/posts", { method: "POST" })
  return post;
};

export const likePost = async (postId) => {
  // return fetch(`/posts/${postId}/like`, { method: "POST" })
};