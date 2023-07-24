import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=10";
const POSTS_URL2 = "https://jsonplaceholder.typicode.com/posts";
interface Post {
  id: String;
  title: String;
  content: String;
}
interface State {
  // posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
  count: number;
}
// set the adapter (tool) that manages the state of the object
// 상태관리 최적화를 위한 도구
// CRUD 작업을 최적화
const postsAdapter = createEntityAdapter({
  sortComparer: (a: any, b: any) => b.date.localeCompare(a.date),
  // b.date가 a.date보다 나중이라면 return 1
  // b.date가 a.date보다 이전이라면 return -1
  // b.date가 a.date와 같다면 return 0
});
const initialState: any = postsAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
});
export const postsSlice: any = createSlice({
  name: "posts",
  initialState,
  // sync process
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      // const existingPost: any = state.posts.find(
      //   (post: any) => post.id === postId
      // );
      // if (existingPost) {
      //   existingPost.reactions[reaction]++;
      // }
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1;
    },
  },
  // async process
  extraReducers(builder) {
    // console.log("builder : ", builder);
    builder
      // it is like a switch case statement
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post: any) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        // because the post adapter has its own CRUD methods
        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // 현재 포스트 배열을 인덱스 값으로 소팅한 배열을 하나 만든다.
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs

        // set the payload
        action.payload.id = state.ids[state.ids.length - 1] + 1;

        // End fix for fake API post IDs
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        // console.log(action.payload);

        // override the post state
        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        // // get the post query id
        // const { id } = action.payload;
        // // set the post date
        // action.payload.date = new Date().toISOString();
        // // set the filtered posts
        // const posts = state.posts.filter((post) => post.id !== id);
        // // set the post state (override)
        // state.posts = [...posts, action.payload];

        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});
// thunks
// create a thunk(it's like a nock)
// 비동기 포스트 관련 액션들을 만든다. (백엔드와 통신하여 처리할)
export const fetchPosts: any = createAsyncThunk(
  // string action type value: 이 값에 따라 pending, fulfilled, rejected가 붙은 액션 타입이 생성된다.
  "posts/fetchPosts",
  // payloadCreator callback: 비동기 로직의 결과를 포함하고 있는 프로미스를 반환하는 비동기 함수
  async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
  }
);
export const addNewPost: any = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  // initialPost : 스토어의 포스트 어레이에 추가할 새로운 포스트, 초기화할 데이터
  // console.log("initialPost : ", initialPost);

  // fake api에 데이터를 생성하는 post요청을 보낸다.
  const response = await axios.post(POSTS_URL, initialPost);
  // console.log("response.data : ", response.data);
  return response.data;
});
export const updatePost: any = createAsyncThunk("posts/updatePost", async (initialPost) => {
  console.log("initialPost : ", initialPost);
  const { id }: any = initialPost;
  try {
    const response = await axios.put(`${POSTS_URL2}/${id}`, initialPost);
    return response.data;
  } catch (err) {
    //return err.message;
    return initialPost; // only for testing Redux!
  }
});
export const deletePost: any = createAsyncThunk("posts/deletePost", async (initialPost) => {
  console.log("initialPost : ", initialPost);
  const { id }: any = initialPost;
  try {
    // just return an empty object from jsonplaceholder's fake api
    // response.data = {}
    const response = await axios.delete(`${POSTS_URL2}/${id}`);
    console.log("response in deletePost : ", response);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  } catch (err: any) {
    return err.message;
  }
});
// selectors
// adaptor를 통해서 selectors를 얻는다.
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: any) => state.posts);
export const getPostsStatus = (state: any) => state.posts.status;
export const getPostsError = (state: any) => state.posts.error;
export const getCount = (state: any) => state.posts.count;
export const selectPostsByUser = createSelector(
  // 선택하려는 함수(기능)을 배열에 넣는다.
  // 스토어의 상태값을 가져오는 함수를 배열안에 넣는다.
  [selectAllPosts, (state, userId) => userId],
  // 이전의 값을 캐시, 변경됐을때만 변경된값을 리턴한다.
  (posts, userId) => posts.filter((post: any) => post.userId === userId)
);
export const { increaseCount, reactionAdded } = postsSlice.actions;
