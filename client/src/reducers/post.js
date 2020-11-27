import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_PPOST,
  REMOVE_POST,
  UPDATE_LIKES,
  UPDATE_UNLIKES,
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: true,
  error: null,
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case ADD_PPOST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload.id) {
            const unLikeUserIndex = post.unlikes
              .map((unlike) => unlike.user)
              .indexOf(payload.userId);
            if (unLikeUserIndex !== -1) {
              post.unlikes.splice(unLikeUserIndex, 1);
            }
            return { ...post, likes: payload.likes };
          }
          return post;
        }),
        loading: false,
      };
    case UPDATE_UNLIKES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload.id) {
            const likeUserIndex = post.likes
              .map((like) => like.user)
              .indexOf(payload.userId);
            if (likeUserIndex !== -1) {
              post.likes.splice(likeUserIndex, 1);
            }
            return { ...post, unlikes: payload.unlikes };
          }
          return post;
        }),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
