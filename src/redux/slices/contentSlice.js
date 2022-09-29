import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';



export const getUsers = createAsyncThunk(
  'content/getUsers',
  async function (_, {
    rejectWithValue,
    dispatch
  }) {
    try {
      const responce = await fetch(`https://jsonplaceholder.typicode.com/users/`);

      if (!responce.ok) {
        throw new Error('произошла ошибка');
      }

      const data = await responce.json();
      const result = await data.map(user => {
        return {
          userId: user.id,
          userName: user.name,
          companyName: user.company.name,
          post: 'test',
        }
      })
      dispatch(setUsers(result));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }

);

export const getPost = createAsyncThunk(
  'content/getPost',
  async function (_, {
    getState,
    rejectWithValue
  }) {

    let usersID = getState().content.users.map(user => user.userId); // получаю id user-ов

    let posts = usersID.map(async (userId) => { //пытаюсь для каждого апросить по 1 посту
      return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts?_limit=1`)
        .then(responce => {
          if (!responce.ok) {
            throw new Error ('ошибка загрузки поста')
          }
          return responce.json();
        })
        .catch (error=>error.message) ;
    })
    let result = Promise.all(posts)

    let res = await result.then(posts => {
      return posts.flat();
    })
    return res;
  })


export const getImages = createAsyncThunk(
  "content/getImages",
  async function (_, {
    getState,
  }) {
   
    let usersID = getState().content.users.map(user => user.userId); 

    let responce = usersID.map(async (userId) => { 
      return fetch(`https:jsonplaceholder.typicode.com/albums/${userId}/photos?_limit=1`)
        .then(responce => {
          if (!responce.ok) {
            throw new Error ('ошибка загрузки поста')
          }
          return responce.json();
        })
        .catch (error=>error.message) ;
    })

    let images = Promise.all(responce) ;

    let res = await images.then(posts => {
      return posts.flat();
    })
    return res;
  });


function setError(state, action) {
  // state.status = "rejected";
  state.error = action.payload;
}

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    users: [], ///  
    posts: [], /// 
    images: [], ///
    statusUsers: "none",
    statusPosts: "none",
    statusImages: "none",
    error: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: {
    // [getUsers.pending]: (state) => {
    //   state.status = "loading";
    //   state.error = false;
    // },
    [getUsers.fulfilled]: (state, action) => {
      state.statusUsers = "resolved";
      state.error = false;
      // state.users = action.payload;
    },
    [getUsers.rejected]: setError,

    [getPost.fulfilled]: (state, action) => {
      state.statusPosts = "resolved";
      state.error = false;
      state.posts = action.payload;
    },

    [getPost.rejected]: setError,

    [getImages.fulfilled]: (state, action) => {
      state.statusImages = "resolved";
      state.error = false;
      state.images = action.payload;
    },

    [getImages.rejected]: setError,
  }
})

export const {
  setUsers
} = contentSlice.actions;

export default contentSlice.reducer;