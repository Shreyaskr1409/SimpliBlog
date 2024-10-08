import { writable } from 'svelte/store';

// Initial user state with empty/default values
export const user = writable({
  statusCode: null,
  message: '',
  data: {
    _id: '',
    username: '',
    fullname: '',
    avatar: '',
    createdAt: '',
    __v: null,
    userInfo: ''
  },
  success: false
});

// Function to update the store with user data
export const setUser = (userData) => {
  user.set({
    statusCode: userData.statusCode,
    message: userData.message,
    data: {
      _id: userData.data._id,
      username: userData.data.username,
      fullname: userData.data.fullname,
      avatar: userData.data.avatar,
      createdAt: userData.data.createdAt,
      __v: userData.data.__v,
      userInfo: userData.data.userInfo
    },
    success: userData.success
  });
};
